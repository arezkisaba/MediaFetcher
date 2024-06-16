import DownloadResponse from '../models/DownloadResponse';
import GetResultResponse from '../models/GetResultResponse';
import ITorrentProvider from './contracts/ITorrentProvider';

class OxTorrentProvider implements ITorrentProvider {
    private baseUrl: string;
    private searchUrl: string;

    constructor() {
        this.baseUrl = "https://www.oxtorrent.co";
        this.searchUrl = `${this.baseUrl}/recherche`;
    }

    async getResults(searchPattern : string): Promise<GetResultResponse[]> {
        const url = `${this.searchUrl}/${encodeURIComponent(searchPattern)}`;

        try {
            const response = await fetch(url, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error getting html: ${response.statusText}`);
            }

            const html = await response.text();
            const tableRegex = /<table class="table table-hover">([\s\S]*?)<\/table>/;
            const tableMatch = html.match(tableRegex);
            
            if (!tableMatch) {
                throw new Error("Table not found in the HTML content.");
            }
        
            const tableHtml = tableMatch[1];
            const rowRegex = /<tr>([\s\S]*?)<\/tr>/g;
            const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
            const linkRegex = /<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/;
        
            const torrentList: GetResultResponse[] = [];
            let rowMatch;
        
            while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
                const rowHtml = rowMatch[1];

                const cells = Array.from(rowHtml.matchAll(cellRegex)).map(match => match[1]);
        
                if (cells.length !== 4) {
                    continue;
                }

                const linkMatch = cells[0].match(linkRegex);
        
                if (!linkMatch) {
                    continue;
                }

                const [_, link, title] = linkMatch;
                const size = cells[1].trim();
                const seeders = parseInt(cells[2].replace(/<[^>]+>/g, '').trim(), 10);
                const leechers = parseInt(cells[3].replace(/<[^>]+>/g, '').trim(), 10);
                const torrent: GetResultResponse = {
                    Title: title,
                    Size: size,
                    Seeders: seeders,
                    Leechers: leechers,
                    Link: btoa(new URL(link, this.baseUrl).toString()),
                };
        
                torrentList.push(torrent);
            }
        
            return torrentList;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to fetch libraries: ${error.message}`);
                throw new Error(`Failed to fetch libraries: ${error.message}`);
            } else {
                console.error('Failed to fetch libraries: An unknown error occurred');
                throw new Error('Failed to fetch libraries: An unknown error occurred');
            }
        }
    }

    async download(torrentSearchUrl: string) : Promise<DownloadResponse> {
        const url = torrentSearchUrl;

        try {
            const response = await fetch(url, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error getting html: ${response.statusText}`);
            }

            const html = await response.text();
            const magnetLinks: string[] = [];
            const magnetLinkRegex = /magnet:\?xt=urn:[a-zA-Z0-9]+:[a-zA-Z0-9]{32,}/g;

            let match;
            while ((match = magnetLinkRegex.exec(html)) !== null) {
                magnetLinks.push(match[0]);
            }

            return  { magnetUrl: magnetLinks[0] };
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to fetch libraries: ${error.message}`);
                throw new Error(`Failed to fetch libraries: ${error.message}`);
            } else {
                console.error('Failed to fetch libraries: An unknown error occurred');
                throw new Error('Failed to fetch libraries: An unknown error occurred');
            }
        }
    }
}

export default OxTorrentProvider;
