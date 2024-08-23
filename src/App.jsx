/* eslint-disable react/prop-types */
import { Suspense, lazy, useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminAuthProvider, {
  AdminAuthContext,
} from "./components/layout/AdminAuthProvider";
import { AuthContext, AuthProvider } from "./components/layout/AuthProvider";
import LoaderComponent from "./components/Loader";
import { AlertDestructive } from "./components/ui/AlertBox";

const AddTreeForm = lazy(() => import("./components/AddTreeForm"));
const TreeMap = lazy(() => import("./components/TreeMap"));
const Login = lazy(() => import("./components/Login"));
const AdminLogin = lazy(() => import("./components/admin/pages/AdminLogin"));
const Dashboard = lazy(() => import("./components/admin/pages/Dashboard"));
const Trees = lazy(() => import("./components/admin/pages/Trees"));
const EditRequests = lazy(() =>
  import("./components/admin/pages/EditRequests")
);
const TreeKbPage = lazy(() => import("./components/TreeKbPage"));
const KbBook = lazy(() => import("./components/admin/pages/KbBook"));

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <LoaderComponent />;
  return user !== null ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
  const { authToken, isLoading, isMobile } = useContext(AdminAuthContext);

  if (isLoading) return <LoaderComponent />;

  if (isMobile) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <AlertDestructive />
      </div>
    );
  }

  return authToken ? children : <Navigate to="/admin/login" />;
};

const AuthLoader = () => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <LoaderComponent />;
  return user ? <Navigate to="/add-tree" /> : <Login />;
};

const AdminAuthLoader = () => {
  const { authToken, isLoading, isMobile } = useContext(AdminAuthContext);
  if (isMobile) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <AlertDestructive />
      </div>
    );
  }
  if (isLoading) return <LoaderComponent />;
  return authToken ? <Navigate to="/admin/dashboard" /> : <AdminLogin />;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <Suspense fallback={<LoaderComponent />}>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<AuthLoader />} />
              <Route
                path="/add-tree"
                element={
                  <PrivateRoute>
                    <AddTreeForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tree-map"
                element={
                  <PrivateRoute>
                    <TreeMap />
                  </PrivateRoute>
                }
              />
              <Route
                path="/:name"
                element={
                  <PrivateRoute>
                    <TreeKbPage />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminAuthLoader />} />
              <Route path="/admin/login" element={<AdminAuthLoader />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/trees"
                element={
                  <AdminRoute>
                    <Trees />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edit-request"
                element={
                  <AdminRoute>
                    <EditRequests />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/kb"
                element={
                  <AdminRoute>
                    <KbBook />
                  </AdminRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
