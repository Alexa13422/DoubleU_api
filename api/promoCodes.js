// api/promoCodes.js
const redis = require('redis');

let client;

// Connect to Redis when the function is invoked (use caching to avoid reconnecting for subsequent calls)
async function getClient() {
    if (!client) {
        client = redis.createClient({
            url: process.env.REDIS_URL,       // This will come from your Vercel environment variables
            socket: { tls: true }              // Use TLS if your Redis Insight instance requires it
        });
        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect();
    }
    return client;
}

module.exports = async (req, res) => {
    try {
        // For example, let's say your promo codes are stored under the key "promoCodes" in Redis
        const redisClient = await getClient();
        const promoData = await redisClient.get('promoCodes');

        // Parse promoData if you stored as JSON or send as is if it's a plain string
        const promoCodes = promoData ? JSON.parse(promoData) : [];

        res.status(200).json({ promoCodes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Redis error' });
    }
};
