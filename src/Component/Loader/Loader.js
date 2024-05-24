import { Box ,CircularProgress} from "@mui/material";

function Loader(){
    return(
        <Box>
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgb(255 255 255 / 70%)",
                padding: "10px"
            }}>
                <CircularProgress color="inherit" />
            </Box>
        </Box>
    )
}

export default Loader;