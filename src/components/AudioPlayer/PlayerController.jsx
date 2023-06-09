import React from "react";
import { IconButton, Slider, Stack } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMute from "@mui/icons-material/VolumeMute";
import { QueueMusic } from "@mui/icons-material";
import QueueListCard from "../Dialogs/QueueListCard";

const PlayerController = ({ audio }) => {
    const [volume, setVolume] = React.useState(1);
    const [open, setOpen] = React.useState(false);

    const handleVolumeChange = (v) => {
        audio.current.volume = v;
    };

    React.useEffect(() => {
        if (audio?.current == null) {
            return;
        }
        
        setVolume(audio.current.volume);

        const onVolumeChange = (e) => {
            setVolume(audio.current.volume);
        }

        audio.current.addEventListener('volumechange', onVolumeChange);

        return () => {
            audio.current.removeEventListener('volumechange', onVolumeChange);
        };
    }, [audio?.current]);

    return (
        <Stack spacing={1} justifyContent="center" alignItems="center" direction="row" sx={{ width: "100%", maxWidth: 250, p:5 }}>
            <IconButton size="small" onClick={() => setOpen(true)} title="queue">
                <QueueMusic />
            </IconButton>
            <IconButton size="small" onClick={(_,v) => handleVolumeChange(volume ? 0 : 0.5)}>
                {volume ? <VolumeUpIcon /> : <VolumeMute />}
            </IconButton>
            <Slider min={0} max={1} step={.01} value={volume} onChange={(_,v) => handleVolumeChange(v)}/>

            <QueueListCard open={open} setOpen={setOpen}/>
        </Stack>
    );
}


export default PlayerController;