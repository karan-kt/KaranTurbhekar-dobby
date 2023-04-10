import React, { useState } from 'react';
import {
    VStack, FormControl, FormLabel, Input,
    InputGroup, InputRightElement, Button, useToast
} from '@chakra-ui/react'


const Login = () => {
    const toast = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const onShowHandler = () => {
        setShow(!show);
    }

    const onSubmitHandler = () => {

    }

    return (
        <VStack spacing='5px'>

            <FormControl id="Email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="Password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4rem">
                        <Button h="2rem" size="sm" onClick={onShowHandler}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button w="100%"
                colorScheme='red'
                style={{ marginTop: "1rem" }}
                loading={loading}
                onClick={onSubmitHandler}>
                Login
            </Button>

        </VStack>
    )
}

export default Login;