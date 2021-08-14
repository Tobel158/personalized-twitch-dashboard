// This is where all the logic for your Twitch API will live!
export default async (req, res) => {
  try {
    if(req.method == "POST") {
      const {data} = req.body
      const accessToken = await getTwitchAccessToken()
      console.log(accesToken)
      res.status(200).json({data})
    }

  } catch(error) {
    res.status(500).send()
  }
}

//actions
const getTwitchAccessToken = async () => {
  const path = `https:/id/twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`

  const response = await fetch(path, {
    method: 'POST'
  })
  if(response) {
    const json = await response.json()
    return json.access_token
  }
}