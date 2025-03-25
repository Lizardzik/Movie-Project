import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (error) {
      return [];
    }
  });

  // Synchronize favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      // Silently handle localStorage errors
    }
  }, [favorites]);

  // Add item to favorites with type
  const addToFavorites = (item, type) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, { ...item, type }];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Remove item from favorites
  const removeFavorites = (itemId) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((item) => item.id !== itemId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Check if item is in favorites
  const isFavorite = (itemId) => {
    return favorites.some((item) => item.id === itemId);
  };

  // Get favorite movies
  const getFavoriteMovies = () => {
    return favorites.filter((item) => item.type === "movie");
  };

  // Get favorite series
  const getFavoriteSeries = () => {
    return favorites.filter((item) => item.type === "series");
  };

  const value = {
    favorites,
    addToFavorites,
    removeFavorites,
    isFavorite,
    getFavoriteMovies,
    getFavoriteSeries,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
