import { GetTorrentDownloadResponse } from '@shared/src/models/GetTorrentDownloadResponse.js';
import DictionaryCache from '../../utils/DictionaryCache.js';
import WebTorrent from 'webtorrent';

const client = new WebTorrent();
const cache = new DictionaryCache();

class TorrentDownloadsService {

    async getTorrents() {
        const items = client.torrents.map(
            torrent => {
                const result : GetTorrentDownloadResponse = {
                    Name: torrent.name,
                    PageLink: cache.get(`magnet:?xt=${torrent.xt}`),
                    Progress: torrent.progress * 100
                };
                return result;
            }
        );
        console.log(`Torrents returned successfully`);
        return items;
    };

    addTorrent(magnetLink : string, pageLink : string, outputDir : string) {
        return new Promise(async (resolve, reject) => {
            if (cache.has(magnetLink)) {
                resolve('item already exists');
                return;
            }

            client.add(magnetLink, { path: outputDir }, (torrent) => {
                const response : GetTorrentDownloadResponse = {
                    Name: torrent.name,
                    PageLink: pageLink,
                    Progress: torrent.progress
                };
                cache.add(`magnet:?xt=${torrent.xt}`, pageLink);
                console.log(`Torrent '${response.Name}' added successfully to ${outputDir}`);
                resolve(response);
            });
        });
    };

    deleteTorrent(magnetLink : string) {
        return new Promise(async (resolve, reject) => {
            client.remove(magnetLink, { destroyStore: true }, () => {
                console.log(`Torrent deleted successfully`);
                resolve(true);
            });
        });
    };
}

export default TorrentDownloadsService;