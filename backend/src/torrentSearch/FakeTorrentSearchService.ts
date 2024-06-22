import { injectable, singleton } from 'tsyringe';
import ITorrentSearchService from './contracts/ITorrentSearchService.js';
import { GetResultResponse } from 'shared/src/models/GetResultResponse.js';

@injectable()
export class FakeTorrentSearchService implements ITorrentSearchService {

    async getResults(searchPattern: string): Promise<GetResultResponse[]> {

        return [
            {
                Title: "Star Wars : The Acolyte FRENCH S01E01 HDTV 2024",
                Link: "https://www.oxtorrent.co/torrent/114420/star-wars-the-acolyte-french-s01e01-hdtv-2024",
                Size: "228.8 MB",
                Seeders: 1087,
                Leechers: 66,
            },
            {
                Title: "Star Wars : The Acolyte FRENCH S01E02 HDTV 2024",
                Link: "https://www.oxtorrent.co/torrent/114421/star-wars-the-acolyte-french-s01e02-hdtv-2024",
                Size: "184.3 MB",
                Seeders: 1107,
                Leechers: 66,
            }
        ];

    }

}
