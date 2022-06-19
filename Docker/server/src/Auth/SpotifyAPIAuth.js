const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')

class SpotifyAPIAuth {

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
        this.spotifyAPIInstance()
    }

    /**
     * spotifyAPIInstance() => permet de créer l'instance de l'API Spotify
     */
    spotifyAPIInstance() {
        this.spotifyApi = new SpotifyWebApi({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: this.redirectUri
        })
    }

    /**
     * redirectToCallback() => permet de rediriger l'utilisateur vers la page de callback
     * @returns 
     */
    redirectToCallback() {
        return this.spotifyApi.createAuthorizeURL(this.spotifyScopes)
    }

    /**
     * auth() => permet d'authentifier l'utilisateur
     * @param {*} req 
     * @returns 
     */
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

    /**
     * authRequestErrorManagement() => permet de gérer les erreurs de la requête d'authentification
     * @param {*} error 
     * @returns 
     */
    authRequestErrorManagement(error){
        if (error) {
            return this.returnToServer('Auth Error', error)
        }
    }

    /**
     * getDataFromRequest() => permet de récupérer les données de la requête
     * @param {*} req 
     */
    async getDataFromRequest(req){
        const code = req.query.code
        const resultAuthrization = await this.spotifyApi.authorizationCodeGrant(code)
        this.tokenManagement(resultAuthrization)
    }

    /**
     * tokenManagement() => permet de gérer les tokens d'accès
     * @param {*} auth 
     */
    tokenManagement(auth){
        this.accessToken = auth.body['access_token']
        this.refreshToken = auth.body['refresh_token']
        this.tokenExpiration = auth.body['expires_in']
        this.tokenFileManagement()
        this.setAccessToken()
    }

    /**
     * setAccessToken() => permet de setter le token d'accès
     */
    setAccessToken(){
        this.spotifyApi.setAccessToken(this.accessToken)
        this.setRefreshToken()
    }

    /**
     * setRefreshToken() => permet de refresh le token
     */
    setRefreshToken(){
        this.spotifyApi.setRefreshToken(this.refreshToken)
    }

    /**
     * expirationTokenManagement() => permet de gérer le token d'accès
     */
    expirationTokenManagement(){
        setInterval(async () => {
            const data = await this.spotifyApi.refreshAccessToken()
            this.accessToken = data.body['access_token']
            this.spotifyApi.setAccessToken(this.accessToken)
            this.tokenFileManagement()
        }, this.tokenExpiration / 2 * 1000)
    }

    /**
     * tokenFileManagement() => permet de gérer le fichier token.json
     */
    tokenFileManagement(){
        this.tokenFile = process.env.TOKEN_FILE
        fs.existsSync(this.tokenFile) ? this.writeInTokenFile() : this.createTokenFile()
    }

    /**
     * writeInTokenFile() => permet d'écrire dans le fichier token.json
     */
    writeInTokenFile(){
        fs.readFile(this.tokenFile, (err) => {
            if(!err){
                fs.writeFile(this.tokenFile, '', ()=>{
                    fs.writeFile(this.tokenFile, this.accessToken, (err)=>{console.log(err)})
                })
            }
        })
    }

    /**
     * createTokenFile() => permet de créer le fichier token.json
     */
    createTokenFile(){        
        console.log('yessssssssss')
        console.log('noooooooo')
        fs.writeFile(this.tokenFile, this.accessToken, (err)=>{
            console.log('noooooooo')
            console.log(err)
        })
    }

    /**
     * returnToServer() => permet de retourner un objet JSON pour savoir si la requête a été effectuée avec succès ou non
     * @param {*} state 
     * @param {*} message 
     * @returns 
     */
    returnToServer(state, message){
        return {
            state : state,
            message : message
        }; 
    }
}

module.exports = {
    instance : SpotifyAPIAuth
}