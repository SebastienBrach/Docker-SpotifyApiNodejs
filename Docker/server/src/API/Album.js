const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
const dotenv = require('dotenv').config();

class Album {

    constructor(){
        this.token = fs.existsSync(process.env.TOKEN_FILE) ? fs.readFileSync(process.env.TOKEN_FILE, 'utf8') : ""
        this.spotifyApi = new SpotifyWebApi()
        this.spotifyApi.setAccessToken(this.token)
    }

    async getAlbum(id){
        return await this.spotifyApi.getAlbum(id)

    }

    async getAlbumTracks(){

    }

    async addToSavedAlbums(){

    }

    async removeFromSavedAlbums(){

    }
    
}

module.exports = {
    instance : Album,
}