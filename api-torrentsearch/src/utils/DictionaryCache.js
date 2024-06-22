class DictionaryCache {
    constructor() {
        this.cache = new Map();
    }

    add(key, value) {
        this.cache.set(key, value);
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }

    remove(key) {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }
}

export default DictionaryCache;