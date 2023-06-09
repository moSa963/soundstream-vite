import { Box } from "@mui/material";
import React from "react";
import { usePlaylists } from "../../contexts/PlaylistsContext";
import LibraryAdd from "@mui/icons-material/LibraryAdd";
import MenuItemLink from "./MenuItemLink";
import CreatePlaylistCard from "../Dialogs/CreatePlaylistCard";
import PlaylistItem from "../Playlist/PlaylistItem";
import AnimatedList from "../AnimatedList/AnimatedList";

const LibrarySection = () => {
    const { playlists } = usePlaylists();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", width: "100%", bgcolor: "inherit" }}>
            <Box alignItems="center" sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "start", sm: "center" } }}>
                <MenuItemLink Icon={LibraryAdd} title="Library" to="library" />
                <Box sx={{ flexGrow: 1 }} />
                <CreatePlaylistCard />
            </Box>

            <AnimatedList 
                values={playlists}
                map={(v) => <PlaylistItem key={v.id} playlist={v} small />}
            />
        </Box>
    );
}

export default LibrarySection;