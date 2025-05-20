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
import { ListSeries } from "../features/adminPage/AddSeries/ListSeries";
import { AddSeries } from "../features/adminPage/AddSeries/addSeries";
import { DetailSeriesAdmin } from "../features/adminPage/AddSeries/detailSeriesAdmin";
import { HomeAdmin } from "../features/adminPage/HomeAdmin/HomeAdmin";
import { Movies } from "../features/userPage/Home/movie";
import { TvShow } from "../features/userPage/Home/tvShow";
import { Profile } from "../features/userPage/Profile/profile";
import { DetailMovie } from "../features/userPage/detailMovies/detailMovies";
import { DetailSeries } from "../features/userPage/detailSeries/detialSeries";
import { Payment } from "../features/userPage/payment/pay";
import { Home } from "../features/userPage/Home/home";
import { DetailMovieAdmin } from "../features/adminPage/AddMovies/detailMoviesAdmin";
import { Episode } from "../features/userPage/detailSeries/episode";

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
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tvSeries",
        element: <TvShow />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/series/:seriesName",
        element: <DetailSeries />,
      },
      {
        path: "/movie/:title",
        element: <DetailMovie />,
      },
      {
        path: "episode/:seriesName/season-:seasonNumber/episode-:episodeName",
        element: <Episode />,
      },
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
