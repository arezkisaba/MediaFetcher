import WebTorrent from 'webtorrent';
import { TorrentResponse } from './TorrentResponse.js';
import { DictionaryCache } from './DictionaryCache.js';

const client = new WebTorrent();
const cache = new DictionaryCache();

export class TorrentService {

    getTorrents() {
        const items = client.torrents.map(
            torrent => {
                const pageLink = cache.get(`magnet:?xt=${torrent.xt}`);
                return new TorrentResponse(torrent.id, torrent.name, pageLink, torrent.progress)
            }
        );
        console.log(`Torrents returned successfully`);
        return items;
    };

    addTorrent(magnetLink, pageLink, outputDir) {
        return new Promise((resolve, reject) => {
            if (cache.has(magnetLink)) {
                resolve('item already exists');
                return;
            }

            client.add(magnetLink, { path: outputDir }, (torrent) => {
                const response = new TorrentResponse(torrent.id, torrent.name, pageLink, torrent.progress);
                cache.add(`magnet:?xt=${torrent.xt}`, pageLink);
                console.log(`Torrent '${response.name}' added successfully to ${outputDir}`);
                resolve(response);
            });
        });
    };

    deleteTorrent(magnetLink) {
        return new Promise((resolve, reject) => {
            client.remove(magnetLink, { destroyStore: true }, () => {
                console.log(`Torrent deleted successfully`);
                resolve(true);
            });
        });
    };
}
