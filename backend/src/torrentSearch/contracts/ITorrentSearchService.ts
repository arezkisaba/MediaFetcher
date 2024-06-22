import { GetResultResponse } from 'shared/src/models/GetResultResponse.js';

export default interface ITorrentSearchService {
    getResults(searchPattern: string): Promise<GetResultResponse[]>;
}
