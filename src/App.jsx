/* eslint-disable react/prop-types */
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
import AdminAuthProvider, {
  AdminAuthContext,
} from "./components/layout/AdminAuthProvide";
import Dashboard from "./components/admin/pages/Dashboard";
import Trees from "./components/admin/pages/Trees";

const PrivateRoute = ({ children, isLoading, user }) => {
  if (isLoading) return <LoaderComponent />;
  return user ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children, isLoading, authToken }) => {
  if (isLoading) return <LoaderComponent />;
  return authToken ? children : <Navigate to="/admin/login" />;
};

const AuthLoader = ({ context }) => {
  return (
    <context.Consumer>
      {({ user, isLoading }) =>
        isLoading ? (
          <LoaderComponent />
        ) : user ? (
          <Navigate to="/add-tree" />
        ) : (
          <Login />
        )
      }
    </context.Consumer>
  );
};

const AdminAuthLoader = ({ context }) => {
  return (
    <context.Consumer>
      {({ authToken, isLoading }) =>
        isLoading ? (
          <LoaderComponent />
        ) : authToken ? (
          <Navigate to="/admin/dashboard" />
        ) : (
          <AdminLogin />
        )
      }
    </context.Consumer>
  );
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLoader context={AuthContext} />} />
            <Route
              path="/add-tree"
              element={
                <AuthContext.Consumer>
                  {({ user, isLoading }) => (
                    <PrivateRoute isLoading={isLoading} user={user}>
                      <AddTreeForm />
                    </PrivateRoute>
                  )}
                </AuthContext.Consumer>
              }
            />
            <Route
              path="/tree-map"
              element={
                <AuthContext.Consumer>
                  {({ user, isLoading }) => (
                    <PrivateRoute isLoading={isLoading} user={user}>
                      <TreeMap />
                    </PrivateRoute>
                  )}
                </AuthContext.Consumer>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={<AdminAuthLoader context={AdminAuthContext} />}
            />
            <Route
              path="/admin/login"
              element={
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) =>
                    isLoading ? (
                      <LoaderComponent />
                    ) : authToken ? (
                      <Navigate to="/admin/dashboard" />
                    ) : (
                      <AdminLogin />
                    )
                  }
                </AdminAuthContext.Consumer>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) => (
                    <AdminRoute isLoading={isLoading} authToken={authToken}>
                      <Dashboard />
                    </AdminRoute>
                  )}
                </AdminAuthContext.Consumer>
              }
            />
            <Route
              path="/admin/trees"
              element={
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) => (
                    <AdminRoute isLoading={isLoading} authToken={authToken}>
                      <Trees />
                    </AdminRoute>
                  )}
                </AdminAuthContext.Consumer>
              }
            />
            <Route
              path="/admin/edit-request"
              element={
                <AdminAuthContext.Consumer>
                  {({ authToken, isLoading }) => (
                    <AdminRoute isLoading={isLoading} authToken={authToken}>
                      <Dashboard />{" "}
                      {/* Change to the correct component if needed */}
                    </AdminRoute>
                  )}
                </AdminAuthContext.Consumer>
              }
            />
          </Routes>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
