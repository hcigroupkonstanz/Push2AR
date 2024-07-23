/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class Message {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Message {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsMessage(bb:flatbuffers.ByteBuffer, obj?:Message):Message {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

channel():string|null
channel(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
channel(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

command():string|null
command(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
command(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

payload():string|null
payload(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
payload(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startMessage(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addChannel(builder:flatbuffers.Builder, channelOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, channelOffset, 0);
}

static addCommand(builder:flatbuffers.Builder, commandOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, commandOffset, 0);
}

static addPayload(builder:flatbuffers.Builder, payloadOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, payloadOffset, 0);
}

static endMessage(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedMessageBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

static createMessage(builder:flatbuffers.Builder, channelOffset:flatbuffers.Offset, commandOffset:flatbuffers.Offset, payloadOffset:flatbuffers.Offset):flatbuffers.Offset {
  Message.startMessage(builder);
  Message.addChannel(builder, channelOffset);
  Message.addCommand(builder, commandOffset);
  Message.addPayload(builder, payloadOffset);
  return Message.endMessage(builder);
}
}
