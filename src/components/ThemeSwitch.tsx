import React, { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../lib/utils";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("dark");
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];
  useEffect(() => {}, []);

  const handleThemeChange = (e) => {
    // e.preventDefault()
    const html = document.getElementsByTagName("html");
    html[0]?.setAttribute("data-theme", e.target.value);
    console.log(html);
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
      <option>Homer</option>
    </select>
  );
};

export default ThemeSwitch;
