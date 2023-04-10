import React, { useState } from 'react';
import {
    VStack, FormControl, FormLabel, Input,
    InputGroup, InputRightElement, Button, useToast
} from '@chakra-ui/react'


const Signup = () => {
    const toast = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const onShowHandler = () => {
        setShow(!show);
    }


    return (
        <VStack spacing='5px'>

            <FormControl id="Email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email " />
            </FormControl>

            <FormControl id="Username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="email" placeholder="Enter your Username " />
            </FormControl>

            <FormControl id="Password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder="Enter your password" />
                    <InputRightElement width="4rem">
                        <Button h="2rem" size="sm" onClick={onShowHandler}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="Re-Password" isRequired>
                <FormLabel>Re-Password</FormLabel>
                <Input type="password" placeholder="Re-enter your password" />
            </FormControl>


            <Button w="100%"
                colorScheme='red'
                style={{ marginTop: "1rem" }}>
                Signup
            </Button>

        </VStack>
    )
}

export default Signup;