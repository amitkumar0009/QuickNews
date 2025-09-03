import React, { useState } from "react";

const Navbar = ({ onCategoryChange }) => {
  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  const [active, setActive] = useState("general");

  const handleClick = (cat) => {
    setActive(cat);
    if (onCategoryChange) {
      onCategoryChange(cat); // pass to parent
    }
  };

  return (
    <div className="px-6 py-3 bg-gray-100">
      <ul className="flex justify-evenly items-center w-full">
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => handleClick(cat)}
            className="cursor-pointer capitalize text-gray-800"
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
