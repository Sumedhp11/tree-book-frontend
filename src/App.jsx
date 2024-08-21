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
import AdminLogin from "./components/admin/pages/AdminLogin";
import AdminAuthProvider, { AdminAuthContext } from "./components/layout/AdminAuthProvide";
import AdminLayout from "./components/admin/Admin";
import Dashboard from "./components/admin/pages/Dashboard";
import Trees from "./components/admin/pages/Trees";

function App() {
  return (
    <Router>
      {/* Routes that use AuthProvider */}
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
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
            </AuthProvider>
          }
        />
        <Route
          path="/add-tree"
          element={
            <AuthProvider>
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
            </AuthProvider>
          }
        />
        <Route
          path="/tree-map"
          element={
            <AuthProvider>
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
            </AuthProvider>
          }
        />

        {/* Admin routes with AdminAuthProvider */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminAuthContext.Consumer>
                {({ authToken, isLoading }) =>
                  isLoading ? (
                    <LoaderComponent />
                  ) : !authToken ? (
                    <Dashboard />
                  ) : (
                    <AdminLogin />
                  )
                }
              </AdminAuthContext.Consumer>
            </AdminAuthProvider>
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <AdminAuthProvider>
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) =>
                    isLoading ? (
                      <LoaderComponent />
                    ) : !authToken ? (
                      <Dashboard />
                    ) : (
                      <AdminLogin />
                    )
                  }
                </AdminAuthContext.Consumer>
              </AdminAuthProvider>
            }
          />
          <Route
            path="/admin/trees"
            element={
              <AdminAuthProvider>
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) =>
                    isLoading ? (
                      <LoaderComponent />
                    ) : !authToken ? (
                      <Trees />
                    ) : (
                      <AdminLogin />
                    )
                  }
                </AdminAuthContext.Consumer>
              </AdminAuthProvider>
            }
          />
          <Route
            path="/admin/edit-request"
            element={
              <AdminAuthProvider>
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) =>
                    isLoading ? (
                      <LoaderComponent />
                    ) : !authToken ? (
                      <Dashboard />
                    ) : (
                      <AdminLogin />
                    )
                  }
                </AdminAuthContext.Consumer>
              </AdminAuthProvider>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
