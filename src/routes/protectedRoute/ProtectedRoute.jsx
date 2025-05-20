import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import LoadingLayout from "../../layouts/loadingLayout/LoadingLayout";
import { AuthContext } from "../../utils/contexts/AuthContextProvider";

const ProtectedRoute = ({ children }) => {
    const { user, authloading } = useContext(AuthContext);
    const location = useLocation();
    
    if (authloading) {
        return (<LoadingLayout />)
    }

    if (user) {
        return children;
    }
    
    return <Navigate state={location.pathname} to="/login" replace={true} />
};

export default ProtectedRoute;