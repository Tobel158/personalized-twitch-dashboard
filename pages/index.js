// Main entry point of your app
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Rect, {useState} from 'react'

const Home = () => {
  //useState
  const [favoriteChannel, setFavoriteChannel] = useState([])

  const addChannel = async event => {
    event.preventDefault() //prevents default behavior of page reloading on form submit
    const {value} = event.target.elements.name
    if(value) {
      //call twitch api
      const path = `https://${window.location.hostname}`
      const response = await fetch(`${path}/api/twitch`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({data: value})
      })

      const json = await response.json()
      console.log("From server: ", json.data)


      setFavoriteChannel(prevState => [...prevState, value])
      event.target.elements.name.value = ""
    }
    console.log(value)

  }


  const renderForm = () => {
    return (<div className={styles.formContainer}> 
      <form onSubmit={addChannel}>
        <input id="name" placeholder="Twitch Channel Name" type="text" required />
        <button type="submit">Add Streamer</button>
      </form>
    </div>)
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
       {renderForm()}
      </div>
    </div>
  )
}

export default Home