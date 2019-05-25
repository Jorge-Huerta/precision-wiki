import React from "react";
import {Route, Redirect} from "react-router-dom";
import fakeAuth from "../test/FakeAuth";

const PrivateRoutes = ({component: Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (fakeAuth.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/upload",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoutes;
