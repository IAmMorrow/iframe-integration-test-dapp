import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {Flex, Text} from "rebass";
import { IFrameEthereumProvider } from '@ethvault/iframe-provider';

const PageContainer = styled.div`
  
`;

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "INFURA_ID" // required
        }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});

type DAPPMainProps = {
    embed?: boolean
}

function DAPPMain({ embed = false }: DAPPMainProps) {
    const [provider, setProvider] = useState<any | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [isConnecting, setConnecting] = useState(false);

    useEffect(() => {
        if (!provider) {
            return;
        }

        provider.on("accountsChanged", () => {
            web3.eth.getAccounts().then(accounts => {
                setAccount(accounts[0]);
            })
        });

        provider.on("chainChanged", () => {

        });

        provider.on("connect", () => {

        });

        provider.on("disconnect", () => {

        });

        const web3 = new Web3(provider);

        setConnecting(true);
        web3.eth.getAccounts()
            .then(accounts => {
                setAccount(accounts[0]);
                setConnecting(false);
            })
            .catch(() => {
                setConnecting(false);
            })
    }, [provider]);

    useEffect(() => {
        if (embed) {
            const p = new IFrameEthereumProvider()
            setProvider(p);
//            console.log(p, window.ethereum)
        } else if (web3Modal.cachedProvider) {
            web3Modal.connect().then((provider) => {
                setProvider(provider);
            });
        }
    }, [setProvider]);

    const handleConnect = useCallback(async () => {
        web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();

        setProvider(provider);
    }, [setProvider]);

    return (
      <PageContainer>
          <TopBar account={account} onConnect={handleConnect} isConnecting={isConnecting} />
          <Flex
              px={3}
              py={2}
              flexDirection="column"
          >
              <Text>
                  {`isConnecting: ${isConnecting}`}
              </Text>
              <Text>
                  {`isConnected: ${!!account}`}
              </Text>
              <Text>
                  {`isIframe: ${embed}`}
              </Text>
          </Flex>
      </PageContainer>
    );
}

export default DAPPMain;