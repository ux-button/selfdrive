import { ItemGrid } from "../components/ItemGrid";
import { testData } from "../testData";
import { useState } from "react";

const RootPage = () => {
  const [storage, setStorage] = useState(testData);

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
