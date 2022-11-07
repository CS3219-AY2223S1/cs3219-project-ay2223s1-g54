import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Progress } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

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
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default PersistLogin;
