import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </React.Fragment>
  );
};

export default PersistLogin;
