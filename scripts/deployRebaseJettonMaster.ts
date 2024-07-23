import { toNano } from '@ton/core';
import { RebaseJettonMaster } from '../wrappers/RebaseJettonMaster';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const rebaseJettonMaster = provider.open(RebaseJettonMaster.createFromConfig({}, await compile('RebaseJettonMaster')));

    await rebaseJettonMaster.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(rebaseJettonMaster.address);

    // run methods on `rebaseJettonMaster`
}
