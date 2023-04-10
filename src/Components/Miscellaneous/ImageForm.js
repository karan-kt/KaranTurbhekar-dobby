import React, { useState } from 'react'
import { Box, Text, FormControl, FormLabel, Input, VStack, Button, useToast } from "@chakra-ui/react"
import Axios from "axios";
import { GalleryState } from '../Context/context';

const ImageForm = ({ update, setUpdate }) => {
    const toast = useToast();
    const { user } = GalleryState();
    const userId = user._id;
    const [imageName, setImageName] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false)

    const onImageHandler = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'Failed',
                description: 'Please select proper image',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false);
            return;
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "Gallery");
            data.append("cloud_name", "karandicle")
            fetch("https://api.cloudinary.com/v1_1/karandicle/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPicture(data.url.toString());
                    console.log(data.url.toString());
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast({
                title: 'Failed',
                description: 'Please select proper image',
                status: 'error',
                duration: 5000,
                isClosable: true,

            })
            setLoading(false);
            return;
        }
    }

    const onSubmitHandler = async () => {
        setLoading(true);
        if (!imageName || !picture) {
            toast({
                title: 'Failed',
                description: 'Please enter the required fields',
                status: 'error',
                duration: 5000,
                isClosable: true,

            })
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "context-type": "application/json",
                }
            }

            const { data } = await Axios.post("http://localhost:4000/api/images/storeimages",
                {
                    imageName, picture, userId
                },
                config)
            console.log(data);
            setLoading(false);
            setUpdate(!update);
            toast({
                title: 'Success',
                description: 'Image added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,

            })
            setImageName("");
            setPicture("");
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
        <Box bg="white" fontFamily="PT Serif"
            borderRadius="lg"
            w="30%"
            borderWidth="0.3rem"
            display="flex"
            flexDirection="column"
            p="5px 8px 5px 8px">

            <Text display="flex" justifyContent="center" fontSize="2xl">Add Your Images</Text>

            <VStack spacing='5px'>
                <FormControl mt="3rem" isRequired>
                    <FormLabel >Name</FormLabel>
                    <Input type="text" value={imageName} placeholder="Image Name"
                        onChange={(e) => setImageName(e.target.value)} />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Select Image</FormLabel>
                    <Input type="file" accept='image/*'
                        onChange={(e) => onImageHandler(e.target.files[0])} />
                </FormControl>
            </VStack>

            <Button isLoading={loading} colorScheme='red' w="100%" onClick={onSubmitHandler}>Upload</Button>
        </Box>
    )
}

export default ImageForm;
