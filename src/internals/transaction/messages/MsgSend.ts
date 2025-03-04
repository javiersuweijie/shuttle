import { Coin } from "@cosmjs/stargate";
import { MsgSend as CosmosMsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

import TransactionMsg, { AminoMsg, ProtoMsg } from "./TransactionMsg";

export type MsgSendValue = {
  fromAddress: string;
  toAddress: string;
  amount: Coin[];
};

export class MsgSend extends TransactionMsg<MsgSendValue> {
  static TYPE = "/cosmos.bank.v1beta1.MsgSend";

  constructor({ fromAddress, toAddress, amount }: MsgSendValue) {
    super(MsgSend.TYPE, {
      fromAddress,
      toAddress,
      amount,
    });
  }

  toTerraExtensionMsg(): string {
    return JSON.stringify({
      "@type": this.typeUrl,
      from_address: this.value.fromAddress,
      to_address: this.value.toAddress,
      amount: this.value.amount,
    });
  }

  toAminoMsg(): AminoMsg<MsgSendValue> {
    return {
      type: "cosmos-sdk/MsgSend",
      value: this.value,
    };
  }

  toProtoMsg(): ProtoMsg {
    const cosmosMsg = this.toCosmosMsg();
    return {
      typeUrl: this.typeUrl,
      value: CosmosMsgSend.encode(CosmosMsgSend.fromPartial(cosmosMsg.value)).finish(),
    };
  }
}

export default MsgSend;
