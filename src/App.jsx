import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import "./css/App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Info from "./pages/Info";
import NavBar from "./components/NavBar";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Series from "./pages/Series";

function App() {
  const resetHomePageRef = useRef(null);

  return (
    <FavoritesProvider>
      <NavBar
        resetHomePage={() =>
          resetHomePageRef.current && resetHomePageRef.current()
        }
      />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home resetHomePageRef={resetHomePageRef} />}
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movieInfo/:movieId" element={<Info />} />
          <Route path="/series" element={<Series />} />
          <Route path="/seriesInfo/:seriesId" element={<Info />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}

export default App;
