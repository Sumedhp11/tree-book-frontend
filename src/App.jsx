// src/App.js

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddTreeForm from "./components/AddTreeForm";
import TreeMap from "./components/TreeMap";
import Login from "./components/Login";
import LoaderComponent from "./components/Loader";
import { AuthProvider, AuthContext } from "./components/layout/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthContext.Consumer>
                {({ user, isLoading }) =>
                  isLoading ? (
                    <LoaderComponent />
                  ) : !user ? (
                    <Login />
                  ) : (
                    <Navigate to="/add-tree" />
                  )
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/add-tree"
            element={
              <AuthContext.Consumer>
                {({ user, isLoading }) =>
                  isLoading ? (
                    <LoaderComponent />
                  ) : user ? (
                    <AddTreeForm />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              </AuthContext.Consumer>
            }
          />
          <Route
            path="/tree-map"
            element={
              <AuthContext.Consumer>
                {({ user, isLoading }) =>
                  isLoading ? (
                    <LoaderComponent />
                  ) : user ? (
                    <TreeMap />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              </AuthContext.Consumer>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
