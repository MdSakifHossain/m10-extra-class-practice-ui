// @ts-nocheck

import { useAuth } from "@/contexts/authContext/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "@/components/app/feedback/Loading";

const PrivatePage = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={`/login`} state={location.pathname} replace />;
};

export default PrivatePage;
