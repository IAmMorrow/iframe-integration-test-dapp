import React from "react";
import {Box, Button, Flex, Text} from "rebass"

type TopBarProps = {
    onConnect: () => void,
    account: string | null,
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