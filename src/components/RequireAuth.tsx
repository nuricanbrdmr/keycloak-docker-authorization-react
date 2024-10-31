import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAuthProps {
    allowedRoles: number[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    return (
        auth?.roles?.some((role: number) => allowedRoles.includes(role)) 
            ? <Outlet />
            : !auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
