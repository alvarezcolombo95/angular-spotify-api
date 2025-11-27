export const environment = {};

export const SpotifyConfiguration = {
   clientId: '90442bb7464449dc8ce9b236836efe91',
   //clientSecret: '51e35e9be15f49bc9a37ed1b313392db',

   //clientId:'8db159699c8742ff80fb061eed67d740',
   //clientSecret:'2f1a8788de9d407daf534dd856fdf7fe',
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
    'user-read-currently-playing',
    'user-library-read',
    'user-read-playback-state',
    'user-modify-playback-state'
    ],
    redirectUrl: 'http://127.0.0.1:4200/log-in',
    token: ''
}