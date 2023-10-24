import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Fortnox } from "./pages/Fortnox/Fortnox";
import { POC } from "./pages/POC/Poc";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fortnox" element={<Fortnox />} />
        <Route path="/poc" element={<POC />} />
      </Routes>
    </Router>
  );
}

export default App;
