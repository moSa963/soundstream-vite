import { Backdrop, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CardBase from "./CardBase";



const ConfirmationCard = ({ message, open, onClose, onConfirmed }) => {

    return (
        <CardBase open={open} setOpen={onClose} >
            <Typography sx={{ width: "100%" }}>{message}</Typography>

            <Stack spacing={2} sx={{ width: "100%", maxHeight: 300, overflow: "auto", alignItems: "end" }}>
                <Stack direction="row" spacing={2}>
                    <Button color="error" onClick={onConfirmed}>Yes</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Stack>
            </Stack>
        </CardBase>
    );
}

export default ConfirmationCard;