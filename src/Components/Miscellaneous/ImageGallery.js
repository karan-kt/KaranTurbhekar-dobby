import React, { useState, useEffect } from 'react'
import {
    Box, Text, Image, Spinner, FormControl, Input,
    InputGroup, InputRightElement, Button, useToast
} from "@chakra-ui/react";
import Axios from "axios";
import { GalleryState } from '../Context/context';
import classes from "./ImageGallery.module.css";
import { Search2Icon } from "@chakra-ui/icons"

const ImageGallery = ({ update, setUpdate }) => {
    const toast = useToast();
    const { user } = GalleryState();
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [search, setSearch] = useState("");

    const loadImages = async () => {
        setLoading(true);
        const { data } = await Axios.post("http://localhost:4000/api/images/getimages", { userId: user._id });
        console.log(data);
        setLoading(false);
        setImageData(data);
    }

    useEffect(() => {
        loadImages()
    }, [update]);

    const onSearchHandler = async () => {
        setLoading(true);
        if (!search) {
            toast({
                title: 'Error',
                description: "Search field is empty",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false);
            return;
        }

        try {
            const { data } = await Axios.post(`http://localhost:4000/api/images/searchimages?search=${search}`, { userId: user._id });
            setImageData(data);
            // setUpdate(!update);
            setLoading(false);
        } catch (error) {
            toast({
                title: 'Error',
                description: "Search Failed",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
            setLoading(false)
            return;
        }
    }

    return (
        <Box bg="white" w="69%"
            p="2px 8px 2px 8px"
            fontFamily="PT Serif"
            borderRadius="lg"
            borderWidth="0.3rem"
            display="flex"
            flexDirection="Column">

            <Box display="flex" justifyContent="space-around">
                <Text fontSize="2xl"
                    fontFamily="PT Serif"
                    mb="0.5rem">
                    Your Images
                </Text>

                <FormControl id="Search" w="30%">
                    <InputGroup>
                        <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <InputRightElement width="3rem">
                            <Button size="sm" bg="red" onClick={onSearchHandler} isLoading={loading}>
                                <Search2Icon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            </Box>

            <Box className={classes.imageScroll} p="4px 8px 4px 8px" display="flex" flexWrap="wrap">
                {imageData && imageData.map((data, i) => (
                    <Box m={1} key={i} display='flex' flexDirection='column'>
                        <Image w="25.3rem"
                            h="15rem" src={data.picture}
                            borderRadius="0.5rem" />
                        <Text display="flex" justifyContent="center" fontSize="1xl">{data.imageName}</Text>
                    </Box>
                ))}
                {loading && <Spinner ml="50%" size='lg' color='red.500' />}
            </Box>
        </Box>
    )
}

export default ImageGallery
