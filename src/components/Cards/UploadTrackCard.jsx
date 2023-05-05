import { Backdrop, Button, IconButton, LinearProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import request from "../../utils/Request";
import { Audiotrack } from "@mui/icons-material";
import CardBase from "./CardBase";



const UploadTrackCard = ({ album, onTrackAdded }) => {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [title, setTitle] = React.useState("");
    const [progress, seProgress] = React.useState(false);


    return (
        <React.Fragment>
            <IconButton onClick={() => setOpen(true)}>
                <Audiotrack />
            </IconButton>

            <CardBase open={open} setOpen={setOpen} >

                {progress && <LinearProgress sx={{ width: "100%", position: "absolute", left: 0, right: 0, top: 0 }} />}

                <TextField fullWidth placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />

                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                    <Typography disabled={progress} sx={{ flex: 1 }}>{file?.name || "..."}</Typography>
                    <Button onClick={(e) => e.currentTarget.children[0].click()} disabled={progress}>
                        <input
                            type="file"
                            accept="Audio/*"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.currentTarget.files[0])}
                        ></input>
                        Chose
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button disabled={!file || !title || progress} onClick={() => save(album.id, title, file, onTrackAdded, setOpen, seProgress)}>Create</Button>
                    <Button disabled={progress} color="error" onClick={(e) => setOpen(false)}>Cancel</Button>
                </Stack>
            </CardBase>
        </React.Fragment>
    );
}

const save = async (albumId, title, track, onAdded, setOpen, seProgress) => {
    seProgress(true);
    const res = await request(`api/tracks/albums/${albumId}`, "POST", { title, track });

    if (res.ok) {
        const js = await res.json();
        onAdded(js.data);
        setOpen(false);
        seProgress(false);

    }
}
export default UploadTrackCard;