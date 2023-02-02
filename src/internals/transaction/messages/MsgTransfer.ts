import { Coin } from "@cosmjs/stargate";
import { MsgTransfer as CosmosMsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import Long from "long";

import TransactionMsg, { ProtoMsg } from "./TransactionMsg";

export type MsgTransferValue = {
  sender: string;
  receiver: string;
  sourcePort: string;
  sourceChannel: string;
  token?: Coin;
  timeoutHeight?: Height;
  timeoutTimestamp?: Long;
};

export class MsgTransfer extends TransactionMsg<MsgTransferValue> {
  constructor({
    sender,
    receiver,
    sourcePort,
    sourceChannel,
    token,
    timeoutHeight,
    timeoutTimestamp,
  }: MsgTransferValue) {
    super("/ibc.applications.transfer.v1.MsgTransfer", {
      sender,
      receiver,
      sourcePort,
      sourceChannel,
      token,
      timeoutHeight,
      timeoutTimestamp,
    });
  }

  toTerraExtensionMsg(): string {
    return JSON.stringify({
      "@type": this.typeUrl,
      sender: this.value.sender,
      receiver: this.value.receiver,
      source_port: this.value.sourcePort,
      source_channel: this.value.sourceChannel,
      token: this.value.token,
      timeout_height: this.value.timeoutHeight
        ? {
            revision_height: this.value.timeoutHeight.revisionHeight,
            revision_number: this.value.timeoutHeight.revisionNumber,
          }
        : undefined,
      timeout_timestamp: this.value.timeoutTimestamp,
    });
  }

  toProtoMsg(): ProtoMsg {
    const cosmosMsg = this.toCosmosMsg();
    return {
      typeUrl: this.typeUrl,
      value: CosmosMsgTransfer.encode(CosmosMsgTransfer.fromPartial(cosmosMsg.value)).finish(),
    };
  }
}

export default MsgTransfer;
