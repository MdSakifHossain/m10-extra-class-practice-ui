// @ts-nocheck

import { useAuth } from "@/contexts/authContext/AuthProvider";
import { Navigate } from "react-router";
import Loading from "@/components/app/feedback/Loading";

const PrivatePage = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={`/login`} replace />;
};

export default PrivatePage;
