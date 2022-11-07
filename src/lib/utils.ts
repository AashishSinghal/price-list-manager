export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTheme() {
  return localStorage.getItem("theme");
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
}
