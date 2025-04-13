// api/visits.js
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);  // connect using the URL from env

module.exports = async (req, res) => {
    try {
        // Increment a counter in Redis and get the new value
        const count = await redis.incr("visits");
        res.status(200).json({ message: `Hello! You are visitor number ${count}.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
