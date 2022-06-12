const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node')
// const token = JSON.parse(fs.readFileSync('token.json'))
const token = 'BQBJMgb3yGkzyvWIJofTyJZ7AkcJSiBdQIQGUKZNdvv4_fFDYpcxLq1--XHwM98rEFpPZIcqCReGFDAyZ-taKSSy58lSQ_qxyu7mBgNhGedh05XLrv-OgZxJUsGz98gPW5u6AI_a1qzGUX3mcTO_UD-blp_MOkOkJE-A8C2M-vpGFe8ZR-4yIR1_peusg6uoqs66JgzOl8rpVebNcDmjwjDc6sUd6-G1q6r6libBfZx_uIFIJm9nKd4_j8EsjNKtouYD0q8m0PhNLw__3EzBKvWVOS4MpSodSLpUNhZ1bSCFLTdkQgD3lgdfm_Qghsk0Bvut5dAIRFS3cblOHwFQXA'

const spotifyApi = new SpotifyWebApi()
spotifyApi.setAccessToken(token)

async function getDataAboutMe(){
    let me = await spotifyApi.getMe()
    getMyPlaylists(me.body.id)
    // console.log(me.body)
    return me
}

async function getMyPlaylists(idUser){
    const data = await spotifyApi.getUserPlaylists(idUser)
    console.log(data.body.items)
}


getDataAboutMe()