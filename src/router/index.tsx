import Cookies from "js-cookie";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { AddCategory } from "../features/adminPage/AddCategory/addCategory";
import { ListMovies } from "../features/adminPage/AddMovies/ListMovies";
import { AddMovies } from "../features/adminPage/AddMovies/addMovie";
import { DetailMovieAdmin } from "../features/adminPage/AddMovies/detailMoviesAdmin";
import { ListSeries } from "../features/adminPage/AddSeries/ListSeries";
import { AddSeries } from "../features/adminPage/AddSeries/addSeries";
import { DetailSeriesAdmin } from "../features/adminPage/AddSeries/detailSeriesAdmin";
import { HomeAdmin } from "../features/adminPage/HomeAdmin/HomeAdmin";
import { HomeContent } from "../features/userPage/Home/home";
import { MovieContent } from "../features/userPage/Home/movie";
import { TvShowContent } from "../features/userPage/Home/tvShow";
import { DetailMovieContent } from "../features/userPage/detailMovies/detailMovies";
import { DetailSeriesContent } from "../features/userPage/detailSeries/detialSeries";
import { EpisodeContent } from "../features/userPage/detailSeries/episode";
import { NotFound } from "../features/userPage/footer/notFound";
import { LayoutUser } from "../layouts/layoutUser";
import { Search } from "../features/userPage/searchPage/search";
import { Subscription } from "../features/subscription/subscription";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!allowedRole.includes(role || "")) {
    return <Navigate to="/" />;
  }

  return children;
};


const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <Subscription />,
      },
      {
        path: '/home',
        element: <HomeContent />,
      },
      {
        path: "/tvSeries",
        element: <TvShowContent />,
      },
      {
        path: "/movies",
        element: <MovieContent />,
      },
      {
        path: "/series/:seriesSlug",
        element: <DetailSeriesContent />,
      },
      {
        path: "/movie/:slug",
        element: <DetailMovieContent />,
      },
      {
        path: "/episode/:seriesSlug/:seasonNumber/:episodeSlug",
        element: <EpisodeContent />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/search/:keyword",
        element: <Search/>,
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <HomeAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/addCategory",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <AddCategory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/movies",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <ListMovies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/series",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <ListSeries />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/addmovie",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <AddMovies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/addseries",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <AddSeries />
      </ProtectedRoute>
    ),
  },
  {
    path: `/admin/detail-series/:seriesName`,
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <DetailSeriesAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/detail-movies/:title",
    element: (
      <ProtectedRoute allowedRole={["ADMIN"]}>
        <DetailMovieAdmin />
      </ProtectedRoute>
    ),
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}
