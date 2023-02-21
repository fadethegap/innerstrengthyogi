import { createContext, useState, useEffect, useContext, useRef } from "react";
import { supabase } from "../utils/supabase";
const Context = createContext();

const Provider = ({ children }) => {
  const [classes, setClasses] = useState();

  const exposed = {
    classes,
    setClasses,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useClasses = () => useContext(Context);

export default Provider;
