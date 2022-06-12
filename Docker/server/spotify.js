const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')

class Spotify {
    constructor() {
        this.clientId = 'bbd636c28a7f4b9f875948046b3021f6'
        this.clientSecret = 'f03f9ac87576486d82168c602fd7cea3'
        this.redirectUri = 'http://localhost:3000/auth'
        this.spotifyScopes = [
            'ugc-image-upload',
            'user-modify-playback-state',
            'user-read-playback-state', 
            'user-read-currently-playing',
            'user-follow-modify',
            'user-follow-read',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read',
            'playlist-read-collaborative',
            'playlist-modify-public',
            'playlist-read-private',
            'playlist-modify-private', 
            'app-remote-control',
            'streaming',
            'user-read-private',
            'user-read-email',
            'user-library-modify',
            'user-library-read'
        ]
        this.tokenFile = 'token.json'
        this.spotifyAPIInstance()
    }

    spotifyAPIInstance() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: this.redirectUri
        })
    }

    redirectToCallback() {
        return this.spotifyApi.createAuthorizeURL(this.spotifyScopes)
    }

    async auth(req){     
        this.authRequestErrorManagement(req.query.error)   
        try {
            await this.getDataFromRequest(req)
            this.expirationTokenManagement()
            return this.returnToServer('success', 'Auth Success')
        } catch (error) {
            return this.returnToServer('Error', error)
        }
    }

    authRequestErrorManagement(error){
        if (error) {
            return this.returnToServer('Auth Error', error)
        }
    }

    async getDataFromRequest(req){
        const code = req.query.code
        const resultAuthrization = await this.spotifyApi.authorizationCodeGrant(code)
        this.tokenManagement(resultAuthrization)
    }

    tokenManagement(auth){
        this.accessToken = auth.body['access_token']
        this.refreshToken = auth.body['refresh_token']
        this.tokenExpiration = auth.body['expires_in']
        this.setAccessToken()
    }

    setAccessToken(){
        this.spotifyApi.setAccessToken(this.accessToken)
        this.setRefreshToken()
    }

    setRefreshToken(){
        this.spotifyApi.setRefreshToken(this.refreshToken)
    }


    expirationTokenManagement(){
        setInterval(async () => {
            const data = await this.spotifyApi.refreshAccessToken()
            const accessToken = data.body['access_token']
            this.spotifyApi.setAccessToken(accessToken)
            this.tokenFileManagement()
        }, this.tokenExpiration / 2 * 1000)
    }

    tokenFileManagement(){
        fs.readFile(this.tokenFile, (err) => {
            if(!err){
                fs.writeFile(this.tokenFile, '', ()=>{
                    fs.writeFile(this.tokenFile, accessToken, ()=>{console.log('oui')})
                })
            }
        })
    }

    returnToServer(state, message){
        return {
            state : state,
            message : message
        }; 
    }
}

module.exports = {
    instance : Spotify
}