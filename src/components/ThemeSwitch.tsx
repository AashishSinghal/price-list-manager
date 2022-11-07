import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  getTheme,
  setTheme as setLocalTheme,
} from "../lib/utils";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light");
  const themes = [
    "light",
    "dark",
    // "cupcake",
    // "bumblebee",
    // "emerald",
    // "corporate",
    // "synthwave",
    // "retro",
    // "cyberpunk",
    // "valentine",
    // "halloween",
    // "garden",
    // "forest",
    // "aqua",
    // "lofi",
    // "pastel",
    // "fantasy",
    // "wireframe",
    // "black",
    // "luxury",
    // "dracula",
    // "cmyk",
    // "autumn",
    // "business",
    // "acid",
    // "lemonade",
    // "night",
    // "coffee",
    // "winter",
  ];

  useEffect(() => {
    setTheme((prev) => {
      updateDocumentTheme(getTheme() || prev);
      return getTheme() || prev;
    });
  }, []);

  const updateDocumentTheme = (theme: string) => {
    const html = document.getElementsByTagName("html");
    html[0]?.setAttribute("data-theme", theme);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // e.preventDefault()
    updateDocumentTheme(e.target.value);
    setLocalTheme(e.target.value);
    setTheme(e.target.value);
  };

  return (
    <select
      className="select-bordered select w-full max-w-xs"
      value={theme}
      onChange={(e) => handleThemeChange(e)}
    >
      {themes.map((t) => {
        return (
          <option key={t} value={t}>
            {capitalizeFirstLetter(t)}
          </option>
        );
      })}
    </select>
  );
};

export default ThemeSwitch;
