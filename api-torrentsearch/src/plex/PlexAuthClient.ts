import { PlexAuthResponse } from './models/PlexAuthResponse';

class PlexAuthClient {
    private plexSignInUrl = 'https://plex.tv/users/sign_in.json';

    async getToken(username: string, password: string): Promise<string> {
        const authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
        const response = await fetch(this.plexSignInUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'X-Plex-Client-Identifier': 'mediafetcher-client-id',
                'X-Plex-Product': 'MediaFetcher',
                'X-Plex-Version': '1.0',
                'X-Plex-Device': 'Linux',
                'X-Plex-Platform': 'Linux',
                'X-Plex-Device-Name': 'MediaFetcher',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching token: ${response.statusText}`);
        }

        const data = await response.json() as PlexAuthResponse;
        return data.user.authToken;
    }
}

export default PlexAuthClient;
