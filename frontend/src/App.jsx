import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";
import ChartContainer from "./components/ChartContainer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<ChartContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
