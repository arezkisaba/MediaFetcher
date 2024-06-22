class TorrentResponse {
    name: string;
    pageLink: string;
    progress: number;

    constructor(name : string, pageLink : string, progress : number) {
        this.name = name;
        this.pageLink = pageLink;
        this.progress = progress * 100;
    }
}

export default TorrentResponse;
