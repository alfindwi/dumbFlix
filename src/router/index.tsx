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
import { Login } from "../features/auth/login";
import { Register } from "../features/auth/register";
import { Subscription } from "../features/subscription/subscription";
import { HomeContent } from "../features/userPage/Home/home";
import { MovieContent } from "../features/userPage/Home/movie";
import { TvShowContent } from "../features/userPage/Home/tvShow";
import { DetailMovieContent } from "../features/userPage/detailMovies/detailMovies";
import { DetailSeriesContent } from "../features/userPage/detailSeries/detialSeries";
import { EpisodeContent } from "../features/userPage/detailSeries/episode";
import { NotFound } from "../features/userPage/footer/notFound";
import { Search } from "../features/userPage/searchPage/search";
import { LayoutUser } from "../layouts/layoutUser";
import { ProfileContent } from "../features/userPage/Profile/profile";
import { ProfileIconsPage } from "../features/userPage/Profile/profileIcons";
import { Account } from "../features/userPage/Account/account";
import { SubscriptionPlans } from "../features/subscription/planSubs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const isSubscriptionActive = Cookies.get("isSubscriptionActive");

  if (!token) return <Navigate to="/login" />;
  if (!allowedRole.includes(role || "")) return <Navigate to="/" />;

  // Hanya cek subscription untuk USER
  if (role === "USER" && isSubscriptionActive !== "true") {
    return <Navigate to="/subscription/plans" />;
  }

  return children;
};



export const SubscriptionRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isSubscriptionActive = Cookies.get("status");

  if (isSubscriptionActive === "Active") {
    return <Navigate to="/dashboard" />;
  } else if (isSubscriptionActive === "NotActive") {
    return <Navigate to="/subscription/plans" />;
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
        path: "/dashboard",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
              <HomeContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/subscription/plans",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <SubscriptionPlans />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tvSeries",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <TvShowContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movies",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <MovieContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/series/:seriesSlug",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <DetailSeriesContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/movie/:slug",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <DetailMovieContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/episode/:seriesSlug/:seasonNumber/:episodeSlug",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <EpisodeContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/search/:keyword",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <Search />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <ProfileContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile-icons",
        element: (
          <ProtectedRoute allowedRole={["USER"]}>
            <ProfileIconsPage />
          </ProtectedRoute>
        ),
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
