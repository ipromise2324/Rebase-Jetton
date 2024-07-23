import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type RebaseJettonMasterConfig = {};

export function rebaseJettonMasterConfigToCell(config: RebaseJettonMasterConfig): Cell {
    return beginCell().endCell();
}

export class RebaseJettonMaster implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new RebaseJettonMaster(address);
    }

    static createFromConfig(config: RebaseJettonMasterConfig, code: Cell, workchain = 0) {
        const data = rebaseJettonMasterConfigToCell(config);
        const init = { code, data };
        return new RebaseJettonMaster(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
