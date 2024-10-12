import { useLocation } from "react-router-dom";

import { RootPage } from "./RootPage";
import { SingleFilePage } from "./SingleFilePage";

const DynamicPage = () => {
  const location = useLocation();

  // Instanse of URLSearchParams to extract query params
  const queryParams = new URLSearchParams(location.search);

  // Search for specific params
  const fileId = queryParams.get("fileId");

  // Navigate to specific page
  return <>{fileId ? <SingleFilePage /> : <RootPage />}</>;
};

export { DynamicPage };
