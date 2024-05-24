import { Box, useScrollTrigger, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from "react";

function SortingComponent({data}){
    const {id, sortBy, setSortBy} = data;
    const [active, setActive]= useState(true);
    const handleSortBy = ()=>{
        setSortBy({name:id, value: sortBy.value === "asc" ? "desc" : "asc"})
    }
    useEffect(()=>{
        if(sortBy.name === id){
            setActive(true);
        }else{
            if(active){
                setActive(false);
            }
        }
    },[data]);
    return(
        <Box sx={{display:"inline-block"}}>
            {active 
            ? <IconButton size="small" sx={{background:"#fff", ml:"5px", width:"30px", height:"30px"}} color="primary" onClick={handleSortBy}>
                {sortBy.value === "asc" ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon/>}
            </IconButton>
            :
            <IconButton size="small" sx={{background:"#fff", ml:"5px",width:"30px", height:"30px"}} onClick={handleSortBy}>
                <KeyboardArrowDownIcon />
            </IconButton>}</Box>
    )
}

export default SortingComponent;