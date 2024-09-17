import { ItemGrid } from "../components/ItemGrid";
import { testData } from "../testData";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context";
import axios from "axios";
import { useCheckAuth } from "../features/useCheckAuth";

const RootPage = () => {
  const [state, dispatch] = useContext(DataContext);

  const [storage, setStorage] = useState(testData);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isAuthenticated } = useCheckAuth();

  if (!isAuthenticated) {
    return <div>Have not logged in</div>;
  }

  return (
    <>
      <div className="grid grid-cols-5">
        {storage.map((item) => {
          return (
            <ItemGrid type={item.type} name={item.name} size={item.size} />
          );
        })}
      </div>
    </>
  );
};

export { RootPage };
