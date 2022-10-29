import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

export const LoggedInGuard = ({ children }) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate("/login");
    }
  }, [user, navigate])

  if(!user) {
    navigate("/login");
  }

  return children
}

