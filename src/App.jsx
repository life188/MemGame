import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./HeroSection";
import NavBar from "./Nav-bar";
import ContactSection from "./contact";

function App() {
  return (
    <Router>
      <div className="bg-pink-50 min-h-screen">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ContactSection />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
