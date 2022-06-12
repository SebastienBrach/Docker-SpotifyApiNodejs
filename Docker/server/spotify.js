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
        const error = req.query.error
        if (error) {
            console.log('Auth Error: ', error)
            res.send('Auth Error: ', error)
            return 
        }
        
        try {
            const code = req.query.code
            const resultAuthrizationCodeGrantt = await this.spotifyApi.authorizationCodeGrant(code)
            const accessToken = resultAuthrizationCodeGrantt.body['access_token']
            this.spotifyApi.setAccessToken(accessToken)
            console.log('Access Token: ', accessToken)
            const refreshToken = resultAuthrizationCodeGrantt.body['refresh_token']
            this.spotifyApi.setRefreshToken(refreshToken)
            console.log('Refresh Token: ', refreshToken)

            const exprireIn = resultAuthrizationCodeGrantt.body['expires_in']
            

            setInterval(async () => {
                const data = await this.spotifyApi.refreshAccessToken()
                const accessToken = data.body['access_token']
                this.spotifyApi.setAccessToken(accessToken)

                fs.readFile(this.tokenFile, (err) => {
                    if(!err){
                        fs.writeFile(this.tokenFile, '', ()=>{
                            fs.writeFile(this.tokenFile, accessToken, ()=>{console.log('oui')})
                        })
                    }
                })
            },exprireIn / 2 * 1000)

            return {
                state : 'success',
                message : 'Auth Success'
            };
        } catch (error) {
            return {
                state : 'Error',
                message : error
            };
        }
    }

}

module.exports = {
    instance : Spotify
}