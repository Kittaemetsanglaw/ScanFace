// src/components/Card.js
import React from 'react';

const Card = ({ title, image }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {image && (
        <img src={image} alt={title} className="w-full h-auto mb-4 rounded" />
      )}
    </div>
  );
};

export default Card;
