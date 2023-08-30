import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import New from "./components/New";
import EntityForm from "./components/EntityForm";
import InvoicePage from "./pages/InvoicePage";

function App() {
  return (
    <Router>
      <div className="app-bkg">
        <div className="app-ctn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<New />}>
              <Route path="/new/invoice/music" element={<InvoicePage />} />
              <Route path="/new/invoice/services" element={<InvoicePage />} />
              <Route path="/new/entity" element={<EntityForm />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
