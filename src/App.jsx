/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import AddTreeForm from "./components/AddTreeForm";
import TreeMap from "./components/TreeMap";
import Login from "./components/Login";
import LoaderComponent from "./components/Loader";
import { AuthProvider, AuthContext } from "./components/layout/AuthProvider";
import AdminLogin from "./components/admin/pages/AdminLogin";
import AdminAuthProvider, {
  AdminAuthContext,
} from "./components/layout/AdminAuthProvider";
import Dashboard from "./components/admin/pages/Dashboard";
import Trees from "./components/admin/pages/Trees";
import EditRequests from "./components/admin/pages/EditRequests";

const PrivateRoute = ({ children, isLoading, user }) => {
  if (isLoading) return <LoaderComponent />;
  return user !== null ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children, isLoading, authToken }) => {
  if (isLoading) return <LoaderComponent />;
  return authToken ? children : <Navigate to="/admin/login" />;
};

const AuthLoader = () => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <LoaderComponent />;
  return user ? <Navigate to="/add-tree" /> : <Login />;
};

const AdminAuthLoader = () => {
  const { authToken, isLoading } = useContext(AdminAuthContext);
  if (isLoading) return <LoaderComponent />;
  return authToken ? <Navigate to="/admin/dashboard" /> : <AdminLogin />;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthLoader />} />
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
            <Route path="/admin" element={<AdminAuthLoader />} />
            <Route path="/admin/login" element={<AdminAuthLoader />} />
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
                      <EditRequests />
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
