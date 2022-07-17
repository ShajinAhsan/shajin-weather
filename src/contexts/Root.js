import { createContext } from "react";
import { FirebaseAuthorization } from "../Firebase/firebase.auth";

//Context: RootContext
export const RootContext = createContext();

const Root = ({ children }) => {
  return (
    <RootContext.Provider value={FirebaseAuthorization()}>
      {children} {/* children */}
    </RootContext.Provider>
  );
};

export default Root;
