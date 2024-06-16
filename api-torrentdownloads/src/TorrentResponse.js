export class TorrentResponse {
    constructor(id, name, pageLink, progress) {
        this.id = id;
        this.name = name;
        this.pageLink = pageLink;
        this.progress = progress * 100;
    }
}
