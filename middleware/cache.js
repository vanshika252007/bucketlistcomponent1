const cache = {};

const TTL = 60 * 1000;

function checkCache(req, res, next) {
    let key = req.originalUrl;

    let cachedData = cache[key];

    if (!cachedData) {
        res.set("X-Cache", "MISS");
        return next();
    }

    let age = Date.now() - cachedData.createdAt;

    if (age > TTL) {
        delete cache[key];

        res.set("X-Cache", "MISS");
        return next();
    }

    res.set("X-Cache", "HIT");

    return res.json(cachedData.value);
}

function saveCache(key, value) {
    cache[key] = {
        value: value,
        createdAt: Date.now()
    };
}

function clearCache() {
    for (let key in cache) {
        delete cache[key];
    }
}

module.exports = {
    checkCache,
    saveCache,
    clearCache
};