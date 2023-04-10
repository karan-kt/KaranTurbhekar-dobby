import React, { useState } from 'react'
import { Box } from '@chakra-ui/react';
import { GalleryState } from '../Context/context';
import { useNavigate } from 'react-router-dom';
import Bar from "../Miscellaneous/Bar"
import ImageForm from "../Miscellaneous/ImageForm";
import ImageGallery from "../Miscellaneous/ImageGallery";

const Mygallery = () => {
    const navigate = useNavigate();
    const [update, setUpdate] = useState(false);
    const { user } = GalleryState();

    return (
        <div style={{ width: "100%" }}>
            {user && <Bar />}
            <div>
                <Box display="flex"
                    justifyContent="space-between"
                    w="100%"
                    h="90vh"
                    p="10px">
                    {user && <ImageForm update={update} setUpdate={setUpdate} />}
                    {user && <ImageGallery update={update} setUpdate={setUpdate} />}
                </Box>
            </div>

        </div>
    )
}

export default Mygallery
