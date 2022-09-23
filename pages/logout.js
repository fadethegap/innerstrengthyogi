import React, { useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/user";

export default function Logout() {
  const { logout, isLoading } = useUser();

  useEffect(() => {
    logout();
  }, []);

  return <>{!isLoading && <div>Logging out...</div>}</>;
}
