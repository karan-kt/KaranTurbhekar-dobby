import React from 'react'
import { Box, Text, Menu, MenuButton, Button, MenuList, MenuItem, Image } from "@chakra-ui/react"
import { GalleryState } from '../Context/context'
import { ChevronDownIcon } from "@chakra-ui/icons"
import Icon from "../Images/Icon.png";
import { useNavigate } from 'react-router-dom';

const Bar = () => {
    const navigate = useNavigate();
    const { user } = GalleryState();

    const onLogoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    return (
        <Box bg="white"
            w="100%"
            display="flex" justifyContent="space-between"
            alignItems="center"
            p="2px 8px 2px 8px"
            borderWidth="0.3rem">
            <Image src={Icon} boxSize='40px'
                objectFit='cover' />
            <Text fontSize="3xl"
                fontFamily="PT Serif">
                Your Pictures
            </Text>
            <Menu >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} fontFamily="PT Serif">
                    {user.username}
                </MenuButton>
                <MenuList>
                    <MenuItem fontFamily="PT Serif" onClick={onLogoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}


export default Bar
