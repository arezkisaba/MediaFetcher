import DownloadResponse from '../../models/DownloadResponse.js';
import { GetTorrentSearchResultResponse } from '@shared/src/models/GetTorrentSearchResultResponse.js';

interface ITorrentProvider {
    getResults(searchPattern : string): Promise<GetTorrentSearchResultResponse[]>;
    download(torrentSearchUrl: string) : Promise<DownloadResponse>;
}

export default ITorrentProvider;
