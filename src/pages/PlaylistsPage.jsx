import { Box } from "@mui/material";
import React from "react";
import { usePlaylists } from "../contexts/PlaylistsContext";
import PlaylistsList from "../components/Playlist/PlaylistsList";


const PlaylistsPage = () => {
    const { playlists, setPlaylists } = usePlaylists();


    return (
        <Box sx={{ width: "100%" }}>

            <PlaylistsList 
                playlists={playlists?.filter(v => !v?.album)}
                setPlaylists={setPlaylists}
            />
        </Box>
    );
}

export default PlaylistsPage;