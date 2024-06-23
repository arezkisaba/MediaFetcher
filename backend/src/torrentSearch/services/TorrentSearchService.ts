import { injectable } from 'tsyringe';
import ITorrentSearchService from './contracts/ITorrentSearchService.js';
import OxTorrentProvider from '../providers/OxTorrentProvider.js'
import ITorrentProvider from '../providers/contracts/ITorrentProvider.js';
import { GetTorrentSearchResultResponse } from '@shared/src/models/GetTorrentSearchResultResponse.js';

@injectable()
class TorrentSearchService implements ITorrentSearchService {
    private providers: ITorrentProvider[];

    constructor() {
        this.providers = [
            new OxTorrentProvider()
        ];
    }

    async getResults(searchPattern: string): Promise<GetTorrentSearchResultResponse[]> {
        const results: GetTorrentSearchResultResponse[] = [];

        for (const provider of this.providers) {
            const providerResults = await provider.getResults(searchPattern);
            results.push(...providerResults);
        }

        return results;
    }

}

export default TorrentSearchService;
