import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthClientRoute = ({ element, allowedRoles }) => {
  const user  = useSelector((state) => {
    if (state.vendor.vendor) return state.vendor.reviewer;
    if (state.client.client) return state.client.user;
    return null;
  });

  if (!user) {
    return <Navigate to="/login" />; 
  }

  return allowedRoles.includes(user) ? element : <Navigate to="/unauthorized" />;
};



export const AuthAdminRoute = ({ element, allowedRoles }) => {
  const user  = useSelector((state) => {
    if (state.admin.admin) return state.admin.admin;
    return null;
  });
  console.log('got admin in authadminroute',user);

  if (!user) {
    return <Navigate to="/admin/login" />; 
  }

  return allowedRoles.includes(user) ? element : <Navigate to="/unauthorized" />;
};