import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { RebaseJettonMaster } from '../wrappers/RebaseJettonMaster';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('RebaseJettonMaster', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('RebaseJettonMaster');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let rebaseJettonMaster: SandboxContract<RebaseJettonMaster>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        rebaseJettonMaster = blockchain.openContract(RebaseJettonMaster.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await rebaseJettonMaster.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: rebaseJettonMaster.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and rebaseJettonMaster are ready to use
    });
});
