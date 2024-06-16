import GetResultResponse from "../models/GetResultResponse";

export default interface ITorrentSearchService {
    getResults(searchPattern: string): Promise<GetResultResponse[]>;
}
