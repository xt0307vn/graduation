import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return(
        <Box sx={{ width: '100%' }}>
            <LinearProgress color="success" />
        </Box>
    )
}