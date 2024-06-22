import * as WebTorrent from 'webtorrent';

declare module 'webtorrent' {
    interface Torrent {
        xt?: string;
    }
}
