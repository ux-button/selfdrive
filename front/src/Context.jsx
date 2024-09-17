import { createContext, useReducer } from "react";
import { reducer, defaultData } from "./Reducer";

// Save state data to context
const DataContext = createContext(null);

const Context = ({ children }) => {
  // Take data from reducer
  const [state, dispatch] = useReducer(reducer, defaultData);

  // Create context to wrap all the app
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

export { Context, DataContext };
