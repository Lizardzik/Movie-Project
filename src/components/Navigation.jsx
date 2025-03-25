import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navigation.css";

const Navigation = () => {
  // Initialize navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();
  const [savedPage, setSavedPage] = useState(1);

  // Retrieve last viewed page from session storage on component mount
  useEffect(() => {
    const storedPage = sessionStorage.getItem("lastPage");
    if (storedPage) {
      setSavedPage(Number(storedPage));
    }
  }, []);

  // Handle navigation back based on current page context
  const handleBack = () => {
    const isFromFavorites = location.state?.isFromFavorites;
    const category = location.state?.category;

    if (isFromFavorites) {
      navigate("/favorites", {
        state: { category },
      });
    } else if (location.pathname.startsWith("/movieInfo/")) {
      const savedPage = sessionStorage.getItem("lastPage") || 1;
      navigate(`/?page=${savedPage}`);
    } else if (location.pathname.startsWith("/seriesInfo/")) {
      const savedPage = sessionStorage.getItem("lastPage") || 1;
      navigate(`/series?page=${savedPage}`);
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={handleBack} className="navigation-button">
      <i className="bi bi-arrow-left-circle"></i>
    </button>
  );
};

export default Navigation;
