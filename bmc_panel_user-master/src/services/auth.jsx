import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";

import { api, apiAuthorization } from "./api";
import { LoadingPage } from "../pages/LoadingPage";

import { BMCContext } from "../providers/BMCProvider";

const Auth = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const history = useHistory();
  const [isLogged, setIsLogged] = useState(null);
  const { setMe, permission, setPermission, profilePJ, alertError, setProfilePJ } = useContext(BMCContext);

  useEffect(() => {
    apiAuthorization()
      .get("/me")
      .then((resp) => {
        if (resp.status === 200) {
          const { data } = resp;
          setMe(data.user);
          setIsLogged(true);
        } else {
          setIsLogged(false);
        }
      })
      .catch((error) => {
        setIsLogged(false);
      });
  }, [setMe]);

      // Perfil PJ
      useEffect(() => {
        async function handleProfile() {
          await apiAuthorization()
            .get("/profile")
            .then((resp) => {
              const { data } = resp;
              setProfilePJ(data);
              if(data.result === 'success'){
                setPermission(true);
              }
            })
            .catch(function (error) {
              alertError(error.response.data.message);
            });
        }
        handleProfile();
      }, []);

  if (isLogged === null) {
    return <LoadingPage />;
  }

  if(typeof permission == "boolean" && !permission && location.pathname !== '/'){
    return (
      <Redirect
        to={{ pathname: '/' }}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) 
      }
    />
  );
};

export default Auth;
