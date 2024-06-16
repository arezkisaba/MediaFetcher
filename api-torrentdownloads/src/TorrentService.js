import WebTorrent from 'webtorrent';
import { TorrentResponse } from './TorrentResponse.js';
import { DictionaryCache } from './DictionaryCache.js';

const client = new WebTorrent();
const cache = new DictionaryCache();

export class TorrentService {

    getTorrents() {
        try {
            const items = client.torrents.map(
                torrent => {
                    const pageLink = cache.get(torrent.magnetURI);
                    return new TorrentResponse(torrent.id, torrent.name, pageLink, torrent.progress)
                }
            );
            console.log(`Torrents returned successfully`);
            return items;
        } catch (error) {
            console.error(`Error while returning torrents`);
        }
    };

    addTorrent(magnetLink, pageLink, outputDir) {
        return new Promise((resolve, reject) => {
            try {
                if (cache.has(magnetLink)) {
                    reject('item already exists')
                }

                client.add(magnetLink, { path: outputDir }, (torrent) => {
                    const response = new TorrentResponse(torrent.id, torrent.name, pageLink, torrent.progress);
                    cache.add(torrent.magnetURI, pageLink);
                    console.log(`Torrent '${response.name}' added successfully to ${outputDir}`);
                    resolve(response);
                });
            } catch (error) {
                console.error(`Error while adding torrent '${response.name}'`);
                reject(error);
            }
        });
    };

    deleteTorrent(magnetLink) {
        return new Promise((resolve, reject) => {
            try {
                client.remove(magnetLink, { destroyStore: true }, () => {
                    console.log(`Torrent deleted successfully`);
                    resolve(true);
                });
            } catch (error) {
                console.error(`Error while deleting torrent`);
                reject(error);
            }
        });
    };
}
