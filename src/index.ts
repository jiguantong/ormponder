import { ponder } from "@/generated";

const listenRelayer = ["0x305cdd9C20adC44BdD722B6A37F49Cb439623E49"];
const listenOracle = ["0xf64a5353Cf2Da7EE514F53Ee949c43E1BC4f494e"];
const listenSignature = ["0x42165Ce95b51D1B845C190C96fB30c4FeF6Abce4"];

ponder.on("ORMPV2:MessageAccepted", async ({ event, context }) => {
  const { MessageAcceptedV2 } = context.db;
  const message = event.args.message;
  await MessageAcceptedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}`,
    data: {
      chainId: BigInt(context.network.chainId),
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      transactionIndex: event.log.transactionIndex,
      logIndex: event.log.logIndex,

      msgHash: event.args.msgHash,
      root: `${event.args.root}`,
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
  await MessageDispatchedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}`,
    data: {
      chainId: BigInt(context.network.chainId),
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      transactionIndex: event.log.transactionIndex,
      logIndex: event.log.logIndex,

      msgHash: event.args.msgHash,
      dispatchResult: event.args.dispatchResult,
    },
  });
});

ponder.on("ORMPV2:MessageAssigned", async ({ event, context }) => {
  const { MessageAssignedV2, MessageAcceptedV2 } = context.db;
  await MessageAssignedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}`,
    data: {
      chainId: BigInt(context.network.chainId),
      blockNumber: event.block.number,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      transactionIndex: event.log.transactionIndex,
      logIndex: event.log.logIndex,

      msgHash: event.args.msgHash,
      oracle: event.args.oracle,
      relayer: event.args.relayer,
      oracleFee: event.args.oracleFee,
      relayerFee: event.args.relayerFee,
    },
  });
  // filter other relayer
  if (listenRelayer.includes(event.args.relayer)) {
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
  // filter other oracle
  if (listenOracle.includes(event.args.oracle)) {
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
  // filter other oracle
  if (listenOracle.includes(event.args.oracle)) {
    await HashImportedV2.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}`,
    data: {
        chainId: BigInt(context.network.chainId),
        blockNumber: event.block.number,
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        transactionIndex: event.log.transactionIndex,
        logIndex: event.log.logIndex,

        srcChainId: event.args.srcChainId,
        targetChainId: BigInt(context.network.chainId),
        oracle: event.args.oracle,
        lookupKey: event.args.lookupKey,
        srcBlockNumber: BigInt(event.args.lookupKey),
        hash: event.args.hash,
      },
    });
  }
});

ponder.on("SignaturePub:SignatureSubmittion", async ({ event, context }) => {
  const { SignatureSubmittion } = context.db;
  // filter other channels
  if (listenSignature.includes(event.args.channel)) {
    await SignatureSubmittion.create({
    id: `${context.network.chainId}-${event.block.number}-${event.log.transactionIndex}-${event.log.logIndex}`,
    data: {
        chainId: BigInt(context.network.chainId),
        blockNumber: event.block.number,
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        transactionIndex: event.log.transactionIndex,
        logIndex: event.log.logIndex,

        sChainId: event.args.chainId,
        channel: event.args.channel,
        msgIndex: event.args.msgIndex,
        signer: event.args.signer,
        signature: event.args.signature,
        data: event.args.data,
      },
    });
  }
});
