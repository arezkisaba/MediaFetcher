import { GetTorrentSearchResultResponse } from 'shared/src/models/GetTorrentSearchResultResponse.js';

export default interface ITorrentSearchService {
    getResults(searchPattern: string): Promise<GetTorrentSearchResultResponse[]>;
}
