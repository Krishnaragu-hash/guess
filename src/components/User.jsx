import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import './user.css'

const User = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate()
    const [navigation,setNavigation] = useState(true);

    const handleValidation = ()=> {
        if(name.length > 0 ) {
            navigate('/playground')
        }
        else if(name.length === 0 || name === "") {
            navigate('/user')
        }
        else {
            navigate('/playground', {replace:navigation})
        }
    }

  return (
    <section id='userDetails'>

        <div>
            <label htmlFor="">Enter the name : </label>

            <input type="text" 
            onChange={(e)=>setName(e.target.value)}/>

            <button onClick={handleValidation}>
                Let's Start
            </button>
        </div>

    </section>
  )
}

export default User