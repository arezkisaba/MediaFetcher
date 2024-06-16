import WebTorrent from 'webtorrent';
import { TorrentResponse } from './TorrentResponse.js';

const client = new WebTorrent();

export class TorrentService {

    getTorrents() {
        try {
            const items = client.torrents.map(
                torrent => new TorrentResponse(torrent.id, torrent.name, torrent.progress)
            );
            console.log(`Torrents returned successfully`);
            return items;
        } catch (error) {
            console.error(`Error while returning torrents`);
            reject(error);
        }
    };

    addTorrent(magnetLink, outputDir) {
        return new Promise((resolve, reject) => {
            try {
                client.add(magnetLink, { path: outputDir }, (torrent) => {
                    const response = new TorrentResponse(torrent.id, torrent.name, torrent.progress);
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
