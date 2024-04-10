import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  // === V2
  MessageAcceptedV2: p.createTable({
    id: p.string(),

    chainId: p.bigint(),
    blockNumber: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.string(),
    transactionIndex: p.int(),
    logIndex: p.int(),

    msgHash: p.string(),
    root: p.string(),
    // message struct
    messageChannel: p.string(),
    messageIndex: p.bigint(),
    messageFromChainId: p.bigint(),
    messageFrom: p.string(),
    messageToChainId: p.bigint(),
    messageTo: p.string(),
    messageGasLimit: p.bigint(),
    messageEncoded: p.string(),
    // extra
    oracle: p.hex().optional(),
    oracleAssigned: p.boolean().optional(),
    oracleAssignedFee: p.bigint().optional(),
    oracleLogIndex: p.int().optional(),
    relayer: p.hex().optional(),
    relayerAssigned: p.boolean().optional(),
    relayerAssignedFee: p.bigint().optional(),
    relayerLogIndex: p.int().optional(),
  }),
  MessageDispatchedV2: p.createTable({
    id: p.string(),

    chainId: p.bigint(),
    blockNumber: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.string(),
    transactionIndex: p.int(),
    logIndex: p.int(),

    msgHash: p.string(),
    dispatchResult: p.boolean(),
  }),
  MessageAssignedV2: p.createTable({
    id: p.string(),

    chainId: p.bigint(),
    blockNumber: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.string(),
    transactionIndex: p.int(),
    logIndex: p.int(),

    msgHash: p.string(),
    oracle: p.hex(),
    relayer: p.hex(),
    oracleFee: p.bigint(),
    relayerFee: p.bigint(),
  }),
  HashImportedV2: p.createTable({
    id: p.string(),

    chainId: p.bigint(),
    blockNumber: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.string(),
    transactionIndex: p.int(),
    logIndex: p.int(),

    srcChainId: p.bigint(),
    targetChainId: p.bigint(),
    oracle: p.hex(),
    lookupKey: p.string(),
    srcBlockNumber: p.bigint(),
    hash: p.string(),
  }),
  SignatureSubmittion: p.createTable({
    id: p.string(),

    chainId: p.bigint(),
    blockNumber: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.string(),
    transactionIndex: p.int(),
    logIndex: p.int(),

    sChainId: p.bigint(),
    channel: p.hex(),
    msgIndex: p.bigint(),
    signer: p.hex(),
    signature: p.string(),
    data: p.string(),
  }),
}));
