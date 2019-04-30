const cacheUrl = new Map();

function saveToCache(url, data) {
    let intervalId = setInterval(() => {
        cacheUrl.delete(url);
        clearInterval(intervalId);
    }, 300000)
    cacheUrl.set(url, data);
}

function getFromCache(url) {
    if (cacheUrl.has(url)) {
        return cacheUrl.get(url);
    }
    return false
}

export async function cache(url, fallback) {
    let data = getFromCache(url);
    if (!data) {
        let response = await fallback(url);
        data = await response.json();
        saveToCache(url, data);
    }
    return Promise.resolve(data);
}