import React from "react";
import styled from "styled-components";
import {Box, Button, Flex, Text} from "rebass"
import Web3 from "web3";

const TopBarContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
`;

type TopBarProps = {
    onConnect: () => void,
    account?: string,
};

function TopBar({ onConnect, account }: TopBarProps) {
    return (
      <Flex
        px={3}
        py={2}
        color='white'
        bg='black'
        alignItems='center'>
        <Text p={2} fontWeight='bold'>Ledger Live test DAPP</Text>
        <Box mx='auto' />
          {
              !account ? (
                  <Button variant="outline" color="black" onClick={onConnect}>
                      Connect
                  </Button>
              ) : <Text fontSize={15} >{account}</Text>
          }
      </Flex>
    )
}

export default TopBar;