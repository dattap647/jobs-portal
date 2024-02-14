import { RouterProvider } from "react-router";
import { router } from "../../jobs-portal/src/routes";
import { ParentProvider } from "./context/ParentContext";

function App() {
  return (
    <ParentProvider>
      <RouterProvider router={router} />
    </ParentProvider>
  );
}

export default App;
