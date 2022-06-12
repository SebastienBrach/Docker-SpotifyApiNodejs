const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
// const token = JSON.parse(fs.readFileSync('token.json'))
const token = 'BQBXNhSRZRF-p_giiv-DC9nvbeM-VBvPjbvANfotsIkXtesPnbX24lkypzEsQSHoAEQ2VF-HXToV2CajISxkJOAi1fEILaHl3GExJGPEq_XhZXWw_H6hyt8nuvTyYDNRGP8whxl_jlsrLV_8aQaExRd5EEm7NvbEIy8_frpITS8uA6slhLmthEW7ymkVTM9zSM0MmKxJrRUybouFOp92FL1z6ohnL6-cfaUiq3-o6YcZSd29hx6DwnKu1Tr4DGjnuP7l9AKK1XqEm70OYJtZwDd3D2hPHmzyf0dGzVL-Tbqys47KcUwsEYnMC5AczKAP8nDTzpug3UQVsn6HYagrKA'

const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(token)

async function getDataAboutMe(){
    let me = await spotifyApi.getMe()
    return me
    // getMyPlaylists(me.body.id)
}

async function getMyPlaylists(idUser){
    const data = await spotifyApi.getUserPlaylists(idUser)
    console.log(data.body.items)
}



module.exports = {
    getDataAboutMe : getDataAboutMe,
}
