import React, { useState } from 'react';
import {
    VStack, FormControl, FormLabel, Input,
    InputGroup, InputRightElement, Button, useToast,
} from '@chakra-ui/react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const onShowHandler = () => {
        setShow(!show);
    }

    const onSubmitHandler = async () => {
        if (!email || !password) {
            toast({
                title: 'Error',
                description: "Please enter the required fields",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }

            const { data } = await Axios.post("http://localhost:4000/api/user/login",
                { email, password }, config);
            toast({
                title: 'Success',
                description: "Login Successfull",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/mygallery");
            console.log(data);
            setLoading(false);
        } catch (error) {
            if (!error.response) {
                toast({
                    title: 'Error',
                    description: "No server response",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            } else if (error.response?.status === 404) {
                toast({
                    title: 'Error',
                    description: "page not found",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Error',
                    description: error.response.data,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setLoading(false);
        }


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
                isLoading={loading}
                onClick={onSubmitHandler}>
                Login
            </Button>

        </VStack>
    )
}

export default Login;