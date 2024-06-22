import TorrentResponse from './TorrentResponse';
import DictionaryCache from './DictionaryCache';
import WebTorrent from 'webtorrent';

const client = new WebTorrent();

// const { default: WebTorrent } = await import('webtorrent');
// client = new WebTorrent();

const cache = new DictionaryCache();

class TorrentService {

    async getTorrents() {

        return [];
        // await this.initClient();
        // const items = client.torrents.map(
        //     torrent => {
        //         const pageLink = cache.get(`magnet:?xt=${torrent.xt}`);
        //         return new TorrentResponse(torrent.name, pageLink, torrent.progress)
        //     }
        // );
        // console.log(`Torrents returned successfully`);
        // return items;
    };

    addTorrent(magnetLink : string, pageLink : string, outputDir : string) {
        return new Promise(async (resolve, reject) => {
            if (cache.has(magnetLink)) {
                resolve('item already exists');
                return;
            }

            // await this.initClient();
            // const { default: WebTorrent } = await import('webtorrent');
            // client = new WebTorrent();

            // client.add(magnetLink, { path: outputDir }, (torrent) => {
            //     const response = new TorrentResponse(torrent.name, pageLink, torrent.progress);
            //     cache.add(`magnet:?xt=${torrent.xt}`, pageLink);
            //     console.log(`Torrent '${response.name}' added successfully to ${outputDir}`);
            //     resolve(response);
            // });
        });
    };

    deleteTorrent(magnetLink : string) {
        return new Promise(async (resolve, reject) => {
            // await this.initClient();
            client.remove(magnetLink, { destroyStore: true }, () => {
                console.log(`Torrent deleted successfully`);
                resolve(true);
            });
        });
    };

    // async initClient() {
    //     if (!client) {
    //         const { default: WebTorrent } = await import('webtorrent');
    //         client = new WebTorrent();
    //     }

    //     return client;
    // }
}

export default TorrentService;