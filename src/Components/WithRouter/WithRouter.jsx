import React from "react";
import { useLocation } from "react-router-dom";

const withRouter = (Component) => {
  return (props) => {
    const location = useLocation();
    return <Component {...props} location={location} />;
  };
};

export default withRouter;