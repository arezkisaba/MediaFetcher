export class TorrentResponse {
    constructor(id, name, progress) {
        this.id = id;
        this.name = name;
        this.progress = progress * 100;
    }
}
