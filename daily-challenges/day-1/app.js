const themeButton = document.getElementById("theme-toggle");
const themeStatus = document.getElementById("theme-status");

const savedTheme = localStorage.getItem("theme") || "light";

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");

    themeButton.textContent =
        theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

    themeStatus.textContent = `Current theme: ${theme}`;

    localStorage.setItem("theme", theme);
}

applyTheme(savedTheme);

themeButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";

    applyTheme(newTheme);
});
