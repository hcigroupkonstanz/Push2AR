import { Subject } from 'rxjs';
import * as io from 'socket.io-client';

export interface Message {
    channel: string;
    command: string;
    payload: unknown;
}

const messageSubject = new Subject<Message>();
export const Messages = messageSubject.asObservable();

let socket!: io.Socket;

const init = (app: string, server?: string, port?: number) => {
    const location = typeof window !== 'undefined' ? window.location.hostname : '';
    server ??= location;
    port ??= 9011; // Default port

    if (!server.startsWith('wss')) {
        server = 'wss://' + server; // Default to http if no protocol is specified
    }
    const serverUrl = `${server}:${port}`;

    socket = io.connect(serverUrl, {
        query: { app, version: '1' },
        transports: ['websocket'],
    });

    console.debug(`Connecting to colibri server on ${serverUrl}`);
    socket.on('connect', () => {
        console.debug(`Connected to colibri server on ${serverUrl}`);
    });

    socket.onAny((channel, msg) => {
        messageSubject.next({
            channel,
            command: msg.command,
            payload: msg.payload,
        });
    });

    RegisterChannel('colibri', (msg) => {
        if (msg.command === 'latency') {
            SendMessage('colibri', 'latency', msg.payload);
        }
    });
};

export const Colibri = {
    init,
};

export const SendMessage = (channel: string, command: string, payload: unknown = {}) => {
    socket.emit(channel, {
        command,
        payload,
    });
};

export const RegisterChannel = (channel: string, handler: (payload: Message) => void) => {
    socket.on(channel, handler);
};

export const UnregisterChannel = (channel: string, handler: (payload: Message) => void) => {
    socket.off(channel, handler);
};

export const RegisterOnce = (channel: string, handler: (payload: Message) => void) => {
    socket.once(channel, handler);
};
