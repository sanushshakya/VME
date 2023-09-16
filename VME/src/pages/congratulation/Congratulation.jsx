import React, {useEffect, useState} from 'react'
import './Congratulation.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Congratulation = () => {
    const {evtId} = useParams();
    const [event, setEvent] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const response = await axios.get(`http://localhost:8000/api/events/read_by_id/${evtId}`)
                setEvent(response.data)
            } catch (error){
                console.error(error);
            }
        }
        fetchData();
    }, [evtId])
  return (
    <div className='congrats'>
        <div className="container">
            <div className="left">
                <img src={`/${event.image_url}`} alt="" />
            </div>
            <div className="right">
                <h3>Congratulations!</h3>
                <p>Your place has been booked in an {event.evt_name} event.</p>
            </div>
        </div>
    </div>
  )
}

export default Congratulation
