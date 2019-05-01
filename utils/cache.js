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

async function tryUrl(url, fallback, retry) {
    try {
        let response = await fallback(url);
        let data = await response.json();
        saveToCache(url, data);
        return data;
    } catch (e) {
        if (retry > 0 && e.message.includes("timed out")) {    
            return tryUrl(url, fallback, retry - 1);
        } else {
            throw e;
        }
    }
}

export function cache(url, fallback, retry) {
    let data = getFromCache(url);
    if (!data) {
        data = tryUrl(url, fallback, retry)
    }
    return Promise.resolve(data);
}