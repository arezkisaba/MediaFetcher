import { injectable } from 'tsyringe';
import ITorrentSearchService from './contracts/ITorrentSearchService.js';
import GetResultResponse from './models/GetResultResponse.js';
import OxTorrentProvider from './providers/OxTorrentProvider.js'
import ITorrentProvider from './providers/contracts/ITorrentProvider.js';

@injectable()
class TorrentSearchService implements ITorrentSearchService {
    private providers: ITorrentProvider[];

    constructor() {
        this.providers = [
            new OxTorrentProvider()
        ];
    }

    async getResults(searchPattern: string): Promise<GetResultResponse[]> {
        const results: GetResultResponse[] = [];

        for (const provider of this.providers) {
            const providerResults = await provider.getResults(searchPattern);
            results.push(...providerResults);
        }

        return results;
    }

}

export default TorrentSearchService;
