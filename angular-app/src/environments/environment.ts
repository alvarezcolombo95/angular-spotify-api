export const environment = {};

export const SpotifyConfiguration = {
    clientId: 'ba48a0aa74a94831843429290627a7d9',
    clientSecret: 'cfb8dce5965a449a92b8e2ef954dc68b',
    authEndpoint: 'https://accounts.spotify.com/authorize',
    scope: [
        'user-read-private',
        'user-read-email',
        'user-follow-read',
        'playlist-read-private',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-top-read',
        'user-read-recently-played',
        'user-read-currently-playing    ',
        'user-library-read',
        'user-read-playback-state',
        'user-modify-playback-state'],
    redirectUrl: 'http://localhost:4200/log-in',
    token: ''
}