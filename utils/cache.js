/* CONST */
const cacheUrl = new Map();

/* Save result of a request */
function saveToCache(url, data) {
    let intervalId = setInterval(() => {
        cacheUrl.delete(url);
        clearInterval(intervalId);
    }, 300000)
    cacheUrl.set(url, data);
}

/* Get data from cache if url is known */
function getFromCache(url) {
    if (cacheUrl.has(url)) {
        return cacheUrl.get(url);
    }
    return false
}

/* Try url if response = times out retry until no retry left */
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

/* proxy request if no data found in cache and save new data to cache */
export function cache(url, fallback, retry) {
    let data = getFromCache(url);
    if (!data) {
        data = tryUrl(url, fallback, retry)
    }
    return Promise.resolve(data);
}