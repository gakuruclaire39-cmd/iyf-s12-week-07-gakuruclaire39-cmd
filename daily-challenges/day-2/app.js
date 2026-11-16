const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchHistory = document.getElementById("search-history");
const searchResult = document.getElementById("search-result");

const STORAGE_KEY = "recentSearches";
const MAX_SEARCHES = 5;

function loadSearches() {
    try {
        const savedSearches = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(savedSearches)
            ? savedSearches.filter(
                (item) => typeof item === "string"
            ).slice(0, MAX_SEARCHES)
            : [];
    } catch (error) {
        console.error("Unable to load searches:", error);
        return [];
    }
}

let recentSearches = loadSearches();

function saveSearches() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(recentSearches)
        );
    } catch (error) {
        console.error("Unable to save searches:", error);
    }
}

function displaySearchResults(searchTerm) {
    searchResult.textContent = `You searched for: ${searchTerm}`;
}

function addSearch(searchTerm) {
    const cleanedSearch = searchTerm.trim();

    if (!cleanedSearch) {
        return;
    }

    recentSearches = [
        cleanedSearch,
        ...recentSearches.filter(
            (item) => item.toLowerCase() !== cleanedSearch.toLowerCase()
        )
    ].slice(0, MAX_SEARCHES);

    saveSearches();
    renderHistory();
    displaySearchResults(cleanedSearch);
}

function renderHistory() {
    searchHistory.innerHTML = "";

    recentSearches.forEach((search) => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");

        button.textContent = search;
        button.className = "history-item";
        button.type = "button";

        button.addEventListener("click", () => {
            searchInput.value = search;
            displaySearchResults(search);
        });

        listItem.appendChild(button);
        searchHistory.appendChild(listItem);
    });
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value;

    addSearch(searchTerm);
});

renderHistory();
