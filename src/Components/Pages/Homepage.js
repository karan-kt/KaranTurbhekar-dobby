import React from 'react'
import {
    Container, Box, Text, TabList,
    Tabs, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import Login from "../Auth/Login.js";
import Signup from "../Auth/Signup.js";

const HomePage = () => {
    return (
        <Container maxW='md' centerContent>
            <Box
                justifyContent="center"
                background="white"
                display="flex"
                width="100%"
                margin="1.5rem 0 1rem 0"
                borderWidth="1px"
                borderRadius="lg"
                p={2}
                fontFamily="PT Serif">
                <Text fontSize="4xl"
                    color="black">
                    My Pixie
                </Text>
            </Box>

            <Box
                w="90%"
                background="white"
                p={3}
                m="0 0 1rem 0"
                borderRadius="lg"
                borderWidth="1px">
                <Tabs
                    size="md"
                    variant='soft-rounded'
                    colorScheme="red"
                    fontFamily="PT Serif">
                    <TabList>
                        <Tab w="50%">Login</Tab>
                        <Tab w="50%">Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage;
