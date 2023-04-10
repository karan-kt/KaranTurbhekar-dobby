import React, { useState } from 'react';
import {
    VStack, FormControl, FormLabel, Input,
    InputGroup, InputRightElement, Button, useToast
} from '@chakra-ui/react'
import Axios from 'axios';


const Signup = () => {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const onShowHandler = () => {
        setShow(!show);
    }

    const onSubmitHandler = async () => {
        if (!email || !username || !password || !repassword) {
            toast({
                title: 'Error',
                description: "Please enter the required fields",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        if (password.length < 6) {
            toast({
                title: 'Error',
                description: "Password should be more than 6 letters",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        if (password !== repassword) {
            toast({
                title: 'Error',
                description: "Password doesn't match",
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
                    "content-type": "application/json",
                }
            }
            const { data } = await Axios.post("http://localhost:4000/api/user/register", { email, username, password }, config)
            toast({
                title: 'Success',
                description: 'Sign-up successful',
                status: 'success',
                duration: 5000,
                isClosable: true,

            })
            console.log(data);
            setEmail("");
            setUsername("");
            setPassword("");
            setRePassword("");
            setLoading(false);
        } catch (error) {
            if (!error?.response) {
                toast({
                    title: 'Error',
                    description: 'No server reponse',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,

                })

            } else if (error.response?.status === 404) {
                toast({
                    title: 'Error',
                    description: 'Page not found',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,

                })
            } else {
                toast({
                    title: 'error',
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
                <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id="Username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="email" placeholder="Enter your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>

            <FormControl id="Password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? "text" : "password"} value={password} placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4rem">
                        <Button h="2rem" size="sm" onClick={onShowHandler}>
                            {show ? "hide" : "show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="Re-Password" isRequired>
                <FormLabel>Re-Password</FormLabel>
                <Input type="password" placeholder="Re-enter your password" value={repassword} onChange={(e) => setRePassword(e.target.value)} />
            </FormControl>


            <Button w="100%"
                colorScheme='red'
                style={{ marginTop: "1rem" }}
                onClick={onSubmitHandler}
                isLoading={loading}>
                Signup
            </Button>

        </VStack>
    )
}

export default Signup;