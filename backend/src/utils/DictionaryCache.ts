class DictionaryCache {
    private cache: Map<string, string>;

    constructor() {
        this.cache = new Map();
    }

    add(key : string, value : string) : void {
        this.cache.set(key, value);
    }

    get(key : string) : string {
        const value = this.cache.get(key);
        if (value === undefined) {
            throw new Error(`Key ${key} not found in cache`);
        }
        
        return value;
    }

    has(key : string) : boolean {
        return this.cache.has(key);
    }

    remove(key : string) : boolean {
        return this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
    }
}

export default DictionaryCache;