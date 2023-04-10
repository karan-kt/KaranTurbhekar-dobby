import React, { useState, useEffect, Fragment } from 'react'
import { Box, Text, Image } from "@chakra-ui/react";
import Axios from "axios";
import { GalleryState } from '../Context/context';
import classes from "./ImageGallery.module.css";

const ImageGallery = ({ update }) => {
    const { user } = GalleryState();
    const [imageData, setImageData] = useState([]);

    const loadImages = async () => {
        const { data } = await Axios.post("http://localhost:4000/api/images/getimages", { userId: user._id });
        console.log(data);
        setImageData(data);
    }

    useEffect(() => {
        loadImages()
    }, [update])

    return (
        <Box bg="white" w="69%"
            p="2px 8px 2px 8px"
            fontFamily="PT Serif"
            borderRadius="lg"
            borderWidth="0.3rem"
            display="flex"
            flexDirection="Column">
            <Text fontSize="2xl"
                fontFamily="PT Serif"
                w="100%"
                mb="0.5rem"
                display="flex"
                justifyContent="center">
                Your Images
            </Text>
            <Box className={classes.imageScroll} p="4px 8px 4px 8px" display="flex" flexWrap="wrap">
                {imageData && imageData.map((data, i) => (
                    <Box m={1} display='flex' flexDirection='column'>
                        <Image key={i} w="25rem"
                            h="15rem" src={data.picture}
                            borderRadius="0.5rem" />
                        <Text display="flex" justifyContent="center" fontSize="1xl">{data.imageName}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ImageGallery
