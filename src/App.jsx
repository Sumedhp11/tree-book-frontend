import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import AddTreeForm from "./components/AddTreeForm";
import TreeMap from "./components/TreeMap";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebaseConfig";
import LoaderComponent from "./components/Loader";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/add-tree" />
          }
        />
        <Route
          path="/add-tree"
          element={user ? <AddTreeForm user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/tree-map"
          element={user ? <TreeMap /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
