import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const RootLayout = () => {
   const authState = useAppSelector((state) => state.auth);

   if (!authState.token) {
      return <Navigate to="/" replace />;
   }

   return ( <Outlet /> );
};

export default RootLayout;
