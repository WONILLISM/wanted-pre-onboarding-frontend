import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { AuthProvider } from "./common/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
