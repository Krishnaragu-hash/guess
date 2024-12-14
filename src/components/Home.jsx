import React from 'react'
import {Link,useNavigate} from 'react-router-dom' // used for navigate
import './home.css'

const Home = () => {
    const navigate = useNavigate()

    function handleChange() {
       navigate('/user')
    }

  return (
    <div className='main'>
            <h1>Guessing Number Game</h1>
            <h3 onClick={handleChange}>
                <Link to={'/'}>New Game</Link>
            </h3>
    </div>
  )
}

export default Home