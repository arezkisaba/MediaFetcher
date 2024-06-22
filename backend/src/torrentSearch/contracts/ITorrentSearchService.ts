import { GetResultResponse } from '@shared/GetResultResponse.js';

export default interface ITorrentSearchService {
    getResults(searchPattern: string): Promise<GetResultResponse[]>;
}
