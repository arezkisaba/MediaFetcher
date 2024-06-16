import DownloadResponse from "../../models/DownloadResponse";
import GetResultResponse from "../../models/GetResultResponse";

interface ITorrentProvider {
    getResults(searchPattern : string): Promise<GetResultResponse[]>;
    download(torrentSearchUrl: string) : Promise<DownloadResponse>;
}

export default ITorrentProvider;
