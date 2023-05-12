import { Box, Stack, Typography } from "@mui/material";
import React from "react";


const CardsSection = ({ title, onShowAll, data, Card, noWrap }) => {

    const handleScroll = (e) => {
        e.currentTarget.scrollBy({ left: e.deltaY / 3 });
    }

    return (
        <Stack spacing={2} sx={{ width: "100%", p: 2 }}>
            <Typography variant="h4" fontFamily="cursive">{title}</Typography>

            <Stack onWheel={handleScroll}
            flexWrap={noWrap ? "nowrap" : "wrap"}
                direction="row"
                justifyContent={noWrap ? "start" : "center"}
                sx={{ overflowX: noWrap ? "auto" : "hidden" }}
            >
                {data?.map(v => <Card key={v.id} data={v} />)}
            </Stack>

            {onShowAll &&
                <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <Typography variant="caption"
                        color="primary"
                        onClick={onShowAll}
                        sx={{ cursor: "pointer", ":hover": { transform: "scale(1.2)" } }}>Show all</Typography>
                </Box>
            }
        </Stack>
    );
}


export default CardsSection;