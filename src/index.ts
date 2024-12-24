import { ponder } from "@/generated";
import * as address from './address.local'
import { randomInt } from "crypto";

ponder.on("ORMPV2:MessageAccepted", async ({ event, context }) => {
  const { MessageAcceptedV2 } = context.db;
  const message = event.args.message;
  const rand = randomInt(1000);
  await MessageAcceptedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}-${rand}`,
    data: {
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,

      logIndex: event.log.logIndex,
      msgHash: event.args.msgHash,
      messageChannel: message.channel,
      messageIndex: message.index,
      messageFromChainId: message.fromChainId,
      messageFrom: message.from,
      messageToChainId: message.toChainId,
      messageTo: message.to,
      messageGasLimit: message.gasLimit,
      messageEncoded: message.encoded,
    },
  });
});

ponder.on("ORMPV2:MessageDispatched", async ({ event, context }) => {
  const { MessageDispatchedV2 } = context.db;
  const rand = randomInt(1000);
  await MessageDispatchedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}-${rand}`,
    data: {
      targetChainId: BigInt(context.network.chainId),
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,

      msgHash: event.args.msgHash,
      dispatchResult: event.args.dispatchResult,
    },
  });
});

ponder.on("ORMPV2:MessageAssigned", async ({ event, context }) => {
  const { MessageAssignedV2, MessageAcceptedV2 } = context.db;
  const rand = randomInt(1000);
  await MessageAssignedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}-${rand}`,
    data: {
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,

      msgHash: event.args.msgHash,
      oracle: event.args.oracle,
      relayer: event.args.relayer,
      oracleFee: event.args.oracleFee,
      relayerFee: event.args.relayerFee,
    },
  });
  // console.log(
  //   event.args.relayer,
  //   listenRelayer.includes(event.args.relayer),
  //   context.network.name
  // );
  // filter other relayer
  if (address.listenRelayer.includes(event.args.relayer)) {
    await MessageAcceptedV2.updateMany({
      where: {
        msgHash: {
          equals: event.args.msgHash,
        },
      },
      data: {
        relayer: event.args.relayer,
        relayerAssigned: true,
        relayerAssignedFee: event.args.relayerFee,
        relayerLogIndex: event.log.logIndex,
      },
    });
  }
  // console.log(
  //   event.args.oracle,
  //   listenRelayer.includes(event.args.oracle),
  //   context.network.name
  // );
  // filter other oracle
  if (address.listenOracle.includes(event.args.oracle)) {
    await MessageAcceptedV2.updateMany({
      where: {
        msgHash: {
          equals: event.args.msgHash,
        },
      },
      data: {
        oracle: event.args.oracle,
        oracleAssigned: true,
        oracleAssignedFee: event.args.oracleFee,
        oracleLogIndex: event.log.logIndex,
      },
    });
  }
});

ponder.on("ORMPV2:HashImported", async ({ event, context }) => {
  const { HashImportedV2 } = context.db;
  const rand = randomInt(1000);
  // filter other oracle
  if (address.listenOracle.includes(event.args.oracle)) {
    await HashImportedV2.create({
      id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}-${rand}`,
      data: {
        blockNumber: event.block.number,
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        srcChainId: event.args.chainId,
        channel: event.args.channel,
        msgIndex: event.args.msgIndex,
        targetChainId: BigInt(context.network.chainId),
        oracle: event.args.oracle,
        hash: event.args.hash,
      },
    });
  }
});

if (process.env['ORMPONDER_ENABLE_SIGNATURE']) {
  ponder.on("SignaturePub:SignatureSubmittion", async ({ event, context }) => {
    const { SignatureSubmittion } = context.db;
    const rand = randomInt(1000);
    // filter other channels
    if (address.listenSignature.includes(event.args.channel)) {
      await SignatureSubmittion.create({
        id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}-${rand}`,
        data: {
          blockNumber: event.block.number,
          blockTimestamp: event.block.timestamp,
          transactionHash: event.transaction.hash,

          srcChainId: event.args.chainId,
          channel: event.args.channel,
          msgIndex: event.args.msgIndex,
          signer: event.args.signer,
          signature: event.args.signature,
          data: event.args.data,
        },
      });
    }
  });
}
