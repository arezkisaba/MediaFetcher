class DictionaryCache {
    private cache: Map<string, string>;

    constructor() {
        this.cache = new Map();
    }

    add(key : string, value : string) : void {
        this.cache.set(key, value);
    }

    get(key : string) : string | undefined {
        return this.cache.get(key);
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