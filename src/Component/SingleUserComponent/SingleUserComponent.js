import { Avatar, Box ,Stack } from "@mui/material";
import { useEffect } from "react";


function GetUserProfile({user}){
    return(
        <Box>
            <Avatar
                alt={user.firstname}
                src={user.image}
                sx={{
                    width:"128px",
                    height:"128px",
                    m:"10px auto"
                }}
             />
             <Stack spacing={2}>
                <Box><strong>Full Name :- </strong> {user.firstName} {user.lastName}</Box>
                <Box><strong>Email :- </strong> {user.email}</Box>
                <Box><strong>Age :- </strong> {user.age}</Box>
                <Box><strong>Phone Number :- </strong> {user.phone}</Box>
            </Stack>
        </Box>
    )
}


export {
    GetUserProfile
}