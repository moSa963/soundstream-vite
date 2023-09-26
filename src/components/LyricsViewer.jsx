import { Box, Typography } from "@mui/material";
import React from "react";


const LyricsViewer = ({ lyrics = "", stamps = [], current = 0, onClick, flex }) => {
    const ref = React.useRef(null);
    const [index, setIndex] = React.useState(0);
    const currentRef = React.useRef(null);

    React.useEffect(() => {
        setIndex(v => {
            for (var i = 0; i < stamps.length; ++i) {
                if (current < stamps[i]) {
                    return i - 1;
                }
            }
            return stamps.length - 1;
        });
    }, [current, stamps]);

    React.useEffect(() => {
        currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
    }, [currentRef.current, index]);

    return (
        <Box sx={{ width: "100%", height: "100%", overflow: "auto", overflowX: "hidden", flex: flex }} ref={ref} >
            {
                mapLyrics(lyrics, index, onClick, currentRef)
            }
        </Box>
    );
}


const mapLyrics = (lyrics, index, onClick, currentRef) => {
    var whitespace = 0;

    return lyrics
        .split(/[\r\n]/)
        .map(
            (line, i) => {
                if (line.length <= 0) {
                    ++whitespace;
                    return <br key={i} />;
                }

                var key = i - whitespace;
                const props = key == index ? { ref: currentRef } : {};
                return (
                    <Typography key={i}
                        onClick={() => onClick && onClick(line, key)}
                        variant="h5"
                        sx={{ width: "fit-content", opacity: index == key ? 1 : 0.8, cursor: "pointer", wordBreak: "break-word", transformOrigin: "left", ":hover": { transform: "scale(1.05)" } }}
                        color={index == key ? "primary" : null}
                        fontFamily="cursive"
                        fontWeight="bold"
                        {...props}>
                        {line}
                    </Typography>
                );
            }
        )
}

export default LyricsViewer;