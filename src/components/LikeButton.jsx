import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";


const LikeButton = ({ liked, setLiked, large }) => {

    const sx = large && { width: 40, height: 40 };

    return (
        <IconButton title="like" onClick={() => setLiked(!liked)}>
            {liked ? <Favorite sx={sx}/> : <FavoriteBorder sx={sx}/> }
        </IconButton>
    );
}

export default LikeButton;