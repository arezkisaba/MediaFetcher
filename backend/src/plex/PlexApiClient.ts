import { parseStringPromise } from 'xml2js';
import { PlexLibrary } from './models/PlexLibrary.js';

class PlexApiClient {
    private serverUrl: string;
    private token: string;

    constructor(serverUrl: string, token: string) {
        this.serverUrl = serverUrl;
        this.token = token;
    }

    async refreshLibrary(libraryId: string): Promise<void> {
        const url = `${this.serverUrl}/library/sections/${libraryId}/refresh`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Plex-Token': this.token,
                },
            });

            if (!response.ok) {
                throw new Error(`Error refreshing library: ${response.statusText}`);
            }

            console.log(`Library ${libraryId} refreshed successfully`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to refresh library: ${error.message}`);
            } else {
                console.error('Failed to refresh library: An unknown error occurred');
            }
        }
    }

    async getLibraries(): Promise<PlexLibrary[]> {
        const url = `${this.serverUrl}/library/sections`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-Plex-Token': this.token,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching libraries: ${response.statusText}`);
            }

            const xml = await response.text();
            const result = await parseStringPromise(xml);
            const libraries = result.MediaContainer.Directory.map((library: any) => ({
                key: library.$.key,
                title: library.$.title,
                type: library.$.type,
            }));

            return libraries;
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

export default PlexApiClient;
