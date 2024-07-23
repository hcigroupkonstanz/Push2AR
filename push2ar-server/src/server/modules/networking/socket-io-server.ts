import * as io from 'socket.io';
import * as _ from 'lodash';
import { Server as HttpServer } from 'http';
import { Observable, Subject } from 'rxjs';

import { Service } from '../core';
import { NetworkClient, NetworkMessage, NetworkServer } from '../command-hooks';

interface SocketIoClient extends NetworkClient {
    socket: io.Socket;
    version: string;
}

export class SocketIOServer extends Service implements NetworkServer {
    public readonly serviceName = 'SocketIO';
    public readonly groupName = 'networking';

    private ioServer!: io.Server;

    private readonly clients: SocketIoClient[] = [];
    private readonly clientStream = new Subject<SocketIoClient[]>();
    private readonly clientConnectedStream = new Subject<SocketIoClient>();
    private readonly clientDisconnectedStream = new Subject<SocketIoClient>();
    private readonly messageStream = new Subject<NetworkMessage>();

    public start(server: HttpServer): void {
        this.ioServer = new io.Server(server, {
            cors: {
                origin: '*'
            }
        });

        this.ioServer.on('connection', (socket) => {
            this.handleNewClient(socket);
        });

        this.logInfo('Successfully attached SocketIO to webserver');
        this.clientStream.next(this.clients);
    }

    public stop(): void {
        this.ioServer.close();
        this.logInfo('Stopped SocketIO server');
    }

    public get clients$(): Observable<SocketIoClient[]> {
        return this.clientStream.asObservable();
    }

    public get clientConnected$(): Observable<NetworkClient> {
        return this.clientConnectedStream.asObservable();
    }

    public get clientDisconnected$(): Observable<NetworkClient> {
        return this.clientDisconnectedStream.asObservable();
    }

    public get currentClients(): ReadonlyArray<SocketIoClient> {
        return this.clients;
    }

    public get messages$(): Observable<NetworkMessage> {
        return this.messageStream.asObservable();
    }


    public broadcast(msg: NetworkMessage, clients: ReadonlyArray<SocketIoClient>): void {
        // FIXME: terrible workaround because other clients send payload as string
        let payload = msg.payload;
        try {
            if (msg.payload)
                payload = JSON.parse(msg.payload);
        } catch (e) { /* ignore */ }

        for (const client of clients) {
            client.socket.emit(msg.channel, {
                command: msg.command,
                payload
            });
        }
    }

    private handleNewClient(socket: io.Socket): void {
        const client: SocketIoClient = {
            id: socket.id,
            app: socket.handshake.query.app as string,
            version: socket.handshake.query.version as string,
            name: socket.handshake.address as string,
            metadata: {},
            socket
        };

        if (!client.app) {
            this.logError('Websocket connection has no app specified; aborting connection');
            socket.disconnect();
            return;
        } else if (client.app !== 'colibri') { // ignore colibri web interface clients
            this.logDebug(`New client (${client.id}) connected from ${socket.handshake.address}, waiting for app name`);
            this.logDebug(`Setting app of new colibri client '${client.name}' (${client.id}, v${client.version}) to "${client.app}"`, {
                clientApp: client.app,
                clientName: client.name,
                clientId: client.id
            });
        }

        this.clients.push(client);
        this.clientConnectedStream.next(client);
        this.clientStream.next(this.clients);

        socket.use(([channel, content]: io.Event, next) => {
            const msg: NetworkMessage = {
                origin: client,
                channel: channel,
                command: content.command,
                // FIXME: terrible workaround because other clients (unity/tcp) send payload as string
                payload: JSON.stringify(content.payload)
            };
            this.messageStream.next(msg);
            next();
        });

        socket.on('error', error => {
            this.logError(JSON.stringify(error));
        });

        socket.on('disconnect', () => {
            this.handleSocketDisconnect(socket);
        });
    }

    private handleSocketDisconnect(socket: io.Socket): void {
        const removedClients = _.remove(this.clients, client => client.socket === socket);
        this.clientStream.next(this.clients);

        for (const rc of removedClients) {
            if (rc.app !== 'colibri') { // ignore colibri web interface clients
                this.logDebug(`Colibri client '${rc.name}' (${rc.id}) disconnected`, {
                    clientApp: rc.app,
                    clientName: rc.name,
                    clientId: rc.id
                });
            }
            this.clientDisconnectedStream.next(rc);
        }
    }
}
