import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const NoClientAuthRoute = ({ element }) => {
  const user  = useSelector((state) => {
    if (state.vendor.vendor) return state.vendor.reviewer;
    if (state.client.client) return state.client.user;
    return null;
  });

  if (user) {
    return <Navigate to="/home" />; // Redirecting authenticated clients to home instead of landing
  }

  return element;
};

export const NoAdminAuthRoute = ({ element }) => {
  const admin  = useSelector((state) => {
    if (state.admin.admin) return state.admin?.admin;
    return null;  
  });

  if (admin) {
    return <Navigate to="/admin/dashboard" />; // Redirecting authenticated clients to home instead of landing
  }

  return element;
};
