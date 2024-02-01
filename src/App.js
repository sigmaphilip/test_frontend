import { Header } from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { POC } from "./pages/POC/Poc";
import { Mapping } from "./pages/POC/Mapping/Mapping";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="mapping/:clientId/:templateId"
                    element={<Mapping />}
                />
                <Route path="/" element={<POC />} />
            </Routes>
        </Router>
    );
}

export default App;
