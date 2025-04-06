import React from "react";
import Loader from "../loader/Loader";

interface ProtectedRouteProps {
  component: React.ComponentType<any>; // Тип компонента, который будет рендериться
  loggedIn: boolean;
  [key: string]: any; // Тип для остальных пропсов, которые могут быть переданы компоненту
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  loggedIn,
  ...props
}) => {
  return loggedIn ? <Component {...props} /> : <Loader />;
};

export default ProtectedRoute;
