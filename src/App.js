import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import Chatbot from "./components/Chatbot";
import Recipes from "./components/Recipes";
import WeeklySchedule from "./components/WeeklySchedule";
import AboutUs from "./components/AboutUs";

// Function to conditionally display the Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/chatbot"]; // Navbar will be hidden only on Chatbot page
  const gradientPages = ["/recipes", "/weekly-schedule", "/about-us"]; // Apply gradient background

  return (
    <div className={gradientPages.includes(location.pathname) ? "gradient-bg" : ""}>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/weekly-schedule" element={<WeeklySchedule />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
