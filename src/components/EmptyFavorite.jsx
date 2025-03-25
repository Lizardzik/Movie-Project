import React from "react";
import "../css/Favorites.css";

// Renders an empty state message when no favorites are added
function EmptyState({ message, linkText, linkUrl }) {
  return (
    <div className="favorites-empty">
      <h2>{message}</h2>
      <p>
        Start adding {linkText} to your favorites <a href={linkUrl}>now!</a>
      </p>
    </div>
  );
}

export default EmptyState;
