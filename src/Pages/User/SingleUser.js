import React, { useEffect, useState } from "react";
import {Box, Card, Container, Button} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from "../../Component/Loader/Loader";
import { GetUserProfile } from "../../Component/SingleUserComponent/SingleUserComponent";

function SingleUser(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [singleUser, setSingleUser]= useState(null);
    const [isLoading, setLoader]= useState(true);
    const getSingleUser = ()=>{
        axios.get(`http://dummyjson.com/users/${id}`).then((res)=>{
            setLoader(false);
            if(res.status === 200){
                setSingleUser(res.data);
            }
        }).catch((e)=>{
            console.log(e);
            setLoader(false);
            Swal.fire({
                title:"Error",
                text:"Something went wrong while getting user Data!",
                icon:"error"
            })
        })
    }
    useEffect(()=>{
        if(id){
            getSingleUser(id);
        }
    },[id]);
    return(
        <Box sx={{my:"20px"}}>
            {isLoading ? <Loader/> :
            <Container>
                <Box sx={{mb:"20px",textAlign:"left"}}>
                    <Button onClick={()=> navigate("/")} size="small" variant="contained" color="error" startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                </Box>
                 <Card sx={{p:"20px"}}>
                    <GetUserProfile user={singleUser}/>
                </Card>
            </Container>
            }
        </Box>
    )
}

export default SingleUser;