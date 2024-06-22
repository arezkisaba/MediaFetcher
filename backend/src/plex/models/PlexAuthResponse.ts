export interface PlexAuthResponse {
    user: PlexUser;
}

export interface PlexUser {
    id: number;
    uuid: string;
    username: string;
    email: string;
    authToken: string;
}
