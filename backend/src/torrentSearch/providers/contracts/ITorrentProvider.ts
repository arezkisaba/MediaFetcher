import DownloadResponse from '../../models/DownloadResponse.js';
import GetResultResponse from '../../models/GetResultResponse.js';

interface ITorrentProvider {
    getResults(searchPattern : string): Promise<GetResultResponse[]>;
    download(torrentSearchUrl: string) : Promise<DownloadResponse>;
}

export default ITorrentProvider;
