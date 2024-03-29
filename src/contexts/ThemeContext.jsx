import React, { createContext } from "react";
import {
    ThemeProvider as MuiThemeProvider,
    createTheme,
} from "@mui/material/styles";
import { indigo, purple } from "@mui/material/colors";

const Context = createContext();

const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = React.useState(getStorageTheme());
    const [mode, setMode] = React.useState("dark");

    const theme = React.useMemo(() => {
        switch (themeMode) {
            case "dark":
                localStorage.setItem("theme", "dark");
                setMode("dark");
                return create("dark");
            case "light":
                localStorage.setItem("theme", "light");
                setMode("light");
                return create("light");
            default:
        }

        localStorage.setItem("theme", "device");

        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setMode("dark");
            return create("dark");
        }

        setMode("light");
        return create("light");
    }, [themeMode]);

    return (
        <MuiThemeProvider theme={theme}>
            <Context.Provider
                value={{
                    themeMode: themeMode,
                    setThemeMode: setThemeMode,
                    mode: mode,
                }}
            >
                {children}
            </Context.Provider>
        </MuiThemeProvider>
    );
};

const create = (mode) => {
    if (mode === "dark") {
        return createTheme({
            palette: {
                mode: "dark",
                primary: {
                    main: indigo[400],
                    dark: indigo[400],
                    light: indigo[400],
                },
                secondary: {
                    main: purple[300],
                    dark: purple[300],
                    light: purple[300],
                },
                background: { default: "#030303", paper: "#0f0f0f" },
            },
        });
    }

    return createTheme({
        palette: {
            mode: "light",
            primary: {
                main: indigo[700],
                dark: indigo[700],
                light: indigo[700],
            },
            secondary: {
                main: purple[700],
                dark: purple[700],
                light: purple[700],
            },
            background: { default: "#cccccc", paper: "#f5f5f5" },
        },
    });
};

const getStorageTheme = () => {
    const theme = window.localStorage.getItem('theme');
    if (theme === "dark") return "dark";
    if (theme === "light") return "light";

    return "device";
};

export default ThemeProvider;

export const useThemeMode = () => React.useContext(Context);
