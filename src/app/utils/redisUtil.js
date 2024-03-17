// Initialize local storage
const storage = {};

// Function to set a key with a TTL (time to live)
const setWithTTL = (key, value, ttl) => {
  return new Promise((resolve, reject) => {
    storage[key] = { value, ttl, timestamp: Date.now() };
    resolve("OK");
  });
};

// Function to get a value by key
const get = (key) => {
  return new Promise((resolve, reject) => {
    const data = storage[key];
    if (data && (!data.ttl || Date.now() - data.timestamp < data.ttl * 1000)) {
      resolve(data.value);
    } else {
      resolve(null); // Key not found or expired
    }
  });
};

module.exports = { setWithTTL, get };
