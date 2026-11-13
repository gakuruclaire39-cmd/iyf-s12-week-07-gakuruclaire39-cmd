const STORAGE_PREFIX = "";

export function save(key, data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

export function load(key, defaultValue = null) {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) {
        return defaultValue;
    }
    try {
        return JSON.parse(raw);
    } catch {
        return defaultValue;
    }
}

export function remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
}
