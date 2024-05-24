import React, { useEffect, useState } from "react";
import {Container, Box,TableContainer,Table,TableHead,TableCell,TableRow,TableBody,TableFooter,Pagination, TextField} from "@mui/material";
import axios from "axios";
import Loader from "../../Component/Loader/Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SortingComponent from "../../Component/SortingComponent/SortingComponent";

function UserList(){
    const navigate  = useNavigate();
    const [totalUser, setTotalUser]= useState(0);
    const [userData, setUserData]= useState(null);
    const [currentPage, setcurrentPage]= useState(1);
    const [isLoading, setLoader]= useState(true);
    const [searchData, setSearch]= useState("");
    const [sortBy, setSortBy]= useState({name:"id", value:"asc"});
    const getUserData = (page)=>{
        setLoader(true);
        const cmSort = `sortBy=${sortBy.name}&order=${sortBy.value}${searchData !== "" ? `&q=${searchData}` : ""}`;
        axios.get(`https://dummyjson.com/users${searchData !== "" ? "/search" : ""}?limit=10&${cmSort}&skip=${page === 1 ? "0" : `${page - 1}0` }`).then((res)=>{
            setLoader(false);
            if(res.status === 200){
                const {users, total} = res.data;
                setUserData(users);
                setTotalUser(Math.ceil(total / 10));
                if(users.length === 0){
                    Swal.fire({
                        text:"No Data Found!",
                        icon:"info"
                    })
                }
            }
        }).catch((e)=>{
            setLoader(false);
            Swal.fire({
                title:"Error",
                text:"Something went wrong while getting user Data!",
                icon:"error"
            })
        })
    }
    const handleSearch = (e)=>{
        setSearch(e.target.value);
        getUserData(1);
    }
    const handleChange = (event, value) => {
        setcurrentPage(value);
    };
    useEffect(()=>{
        getUserData(currentPage);
    },[currentPage,sortBy]);
    return(
        <Container>
            <Box sx={{my:"30px"}}>
            <Box sx={{textAlign:"left", mb:"30px"}}>
                <TextField placeholder="Search" value={searchData} onChange={handleSearch}/>
            </Box>
            <Box sx={{ position: "relative", padding: `${isLoading ? "10px" : "0px"}` }}>
                {isLoading && <Loader />}
                     <TableContainer sx={{borderRadius:"10px", border:"1px solid #eee"}}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead sx={{background:"grey"}}>
                                <TableRow>
                                    <TableCell width={"70"} sx={{color:"#fff"}}>ID <SortingComponent data={{sortBy, setSortBy, id:"id"}}/></TableCell>
                                    <TableCell sx={{color:"#fff"}}>Full Name <SortingComponent data={{sortBy, setSortBy, id:"firstName"}}/></TableCell>
                                    <TableCell sx={{color:"#fff"}}>User Name <SortingComponent data={{sortBy, setSortBy, id:"username"}}/></TableCell>
                                    <TableCell sx={{color:"#fff"}}>Email <SortingComponent data={{sortBy, setSortBy, id:"email"}}/></TableCell>
                                    <TableCell sx={{color:"#fff"}}>City</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {userData !== null && userData.map((row) => (
                                <TableRow
                                onClick={()=> navigate(`/user/${row.id}`)}
                                    key={`user-list-${row.id}`}
                                    sx={{cursor:"pointer", '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.firstName} {row.lastName}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address.city}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                {totalUser > 10 && <Box sx={{mt:"30px"}}>
                        <Pagination count={totalUser} onChange={handleChange} variant="outlined" shape="rounded" />
                    </Box>}
            </Box>
            </Box>
        </Container>
    )
}

export default UserList;