import React, {useState, useEffect} from 'react'
import './Participate.scss'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

const Participate = () => {
    const {evtId} = useParams();
    const accessToken = Cookies.get('accessToken')
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("accessToken"));
    const [user, setUser] = useState([]);
    const [members, setMember] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (value) => {
        if (selectedItems.includes(value)) {
          setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
          setSelectedItems([...selectedItems, value]);
        }
      };
    
    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.post(`http://localhost:8000/api/auth/test-token/${accessToken}`)
                setUser(response.data)
                setMember(response.data.team_member)
            } catch (error){
                console.error(error.response?.data || error);
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e)=> {
        const formData = new FormData();
        e.preventDefault()
        formData.append('team_name', `${user.team_name}`);
        formData.append('member', `${selectedItems}`);
        formData.append('description', e.target.description.value);
        formData.append('u_id',`${user._id}`);
        formData.append('evt_id',`${evtId}`);
        try{
            const response = await axios.post('http://localhost:8000/api/participants/create', formData);
            window.location.href = `/congrats/${evtId}`
        } catch (error) {
            console.error(error.response?.data || error);
        }
    }

  return (
    <div className='participate'>
        {isLoggedIn ? (
            <div className="container">
                <div className="left">
                    <div className="top">
                        <h3>Book Your Place</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className="bottom">
                        <form onSubmit={handleSubmit}>
                            <div className="credentials">
                                <p>Team Name:</p>
                                <span>
                                    <input name="team_name" type='text' placeholder={user.team_name}/>
                                </span>
                                <p>Select 8-12 members from the team:</p>
                                <span>
                                    <div className="team">
                                        {members.map(member => (
                                            <div key={member}>
                                                <label>
                                                    <span>{member}</span>
                                                    <input 
                                                        type="checkbox" 
                                                        value={member}
                                                        checked={selectedItems.includes(member)}
                                                        onChange={() => handleCheckboxChange(member)}
                                                    required/>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </span>
                                <p>Description:</p>
                                <span>
                                    <input name="description" type='text' placeholder='About Your Team'/>
                                </span>
                            </div>
                            <button type='submit'>Book</button>
                        </form>
                    </div>
                </div>
                <div className="right">
                    <img src='/./img/featured1.png'/>
                </div>
            </div> ) : (
                window.location.href = `/login`
            )}
    </div>
  )
}

export default Participate
