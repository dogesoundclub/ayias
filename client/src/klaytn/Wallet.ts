import { BigNumber } from "@ethersproject/bignumber";
import EventContainer from "eventcontainer";
import ExtWallet from "./ExtWallet";

class Wallet extends EventContainer {

    constructor() {
        super();
        this.checkConnected();

        ExtWallet.toss("connect", this);
    }

    private async checkConnected() {
        if (await this.connected() === true) {
            this.fireEvent("connect");
        }
    }

    public async loadAddress(): Promise<string | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadAddress();
        } else {
        }
    }

    public async loadBalance(): Promise<BigNumber | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.loadBalance();
        }
    }

    public async balanceOf(address: string): Promise<BigNumber | undefined> {
        if (ExtWallet.installed === true) {
            return await ExtWallet.balanceOf(address);
        }
    }

    public async connected() {
        return await this.loadAddress() !== undefined;
    }

    public async connect() {
        if (ExtWallet.installed === true) {
            return await ExtWallet.connect();
        } else {
        }
    }

    public async addToken(
        address: string,
        symbol: string,
        decimals: number,
        image: string,
    ) {
        if (ExtWallet.installed === true) {
            ExtWallet.addToken(address, symbol, decimals, image);
        }
    }

    public async signMessage(message: string): Promise<{
        signedMessage?: string,
    }> {
        if (ExtWallet.installed === true) {
            return {
                signedMessage: await ExtWallet.signMessage(message),
            };
        } else {
            return {
            };
        }
    }
}

export default new Wallet();