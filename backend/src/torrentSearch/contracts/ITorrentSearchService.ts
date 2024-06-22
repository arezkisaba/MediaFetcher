import GetResultResponse from '../models/GetResultResponse.js';

export default interface ITorrentSearchService {
    getResults(searchPattern: string): Promise<GetResultResponse[]>;
}
