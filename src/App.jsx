import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddTreeForm from "./components/AddTreeForm";
import TreeMap from "./components/TreeMap";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddTreeForm />} />
        <Route path="/tree-map" element={<TreeMap />} />
      </Routes>
    </Router>
  );
}

export default App;
