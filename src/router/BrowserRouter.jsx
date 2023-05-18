import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LikesPage from "../pages/LikesPage";
import SearchPage from "../pages/SearchPage";
import ShowPlaylistPage from "../pages/ShowPlaylistPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import LibraryPage from "../pages/LibraryPage";
import request from "../utils/Request";
import ProfilePage from "../pages/AccountPage/ProfilePage";
import AccountPage from "../pages/AccountPage/AccountPage";
import ShowUserPage from "../pages/ShowUserPage";
import ShowTrackPage from "../pages/ShowTrackPage";



export const createRoutes = () => createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "likes",
                element: <LikesPage />,
            },
            {
                path: "search",
                element: <SearchPage />,
            },
            {
                path: "account",
                element: <AccountPage />,
                children: [
                    {
                        index: true,
                        element: <ProfilePage />,
                    },
                ]
            },
            {
                path: "user/:username",
                element: <ShowUserPage />,
                loader: async ({ params }) => request(`api/users/${params.username}`)
            },
            {
                path: "track/:id",
                element: <ShowTrackPage />,
                loader: async ({ params }) => request(`api/tracks/${params.id}`)
            },
            {
                path: "library",
                children: [
                    {
                        index: true,
                        element: <LibraryPage />,
                    },
                    {
                        path: ":albumId",
                        element: <ShowPlaylistPage album/>,
                        loader: async ({ params }) => request(`api/playlists/${params.albumId}`),

                    },
                ]
            },
            {
                path: "playlist",
                children: [
                    {
                        index: true,
                        element: <PlaylistsPage />,
                    },
                    {
                        path: ":playlistId",
                        element: <ShowPlaylistPage />,
                        loader: async ({ params }) => request(`api/playlists/${params.playlistId}`),

                    },
                ]
            }
        ]
    }
]);