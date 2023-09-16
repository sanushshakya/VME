import React, {useEffect, useState} from 'react';
import './EventDetail.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const EventDetail = () => {
    const [pars, setPar] = useState([])
    const {evtId} = useParams()
    const accessToken = Cookies.get('accessToken')
    const [user, setUser] = useState(!!Cookies.get('accessToken'));
    const [tie, setTie] = useState(null);
    const [event, setEvent] = useState(null);



    const generateTieSheet = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/api/events/read_by_participant/${evtId}`)
            setTie(response.data)
        } catch (error){
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const resEvt = await axios.get(`http://localhost:8000/api/participants/read_by_event/${evtId}`)
                setPar(resEvt.data)
                const resUser = await axios.post(`http://localhost:8000/api/auth/test-token/${accessToken}`)
                setUser(resUser.data)
                const resEvent = await axios.get(`http://localhost:8000/api/events/read_by_id/${evtId}`)
                setEvent(resEvent.data)
                
            } catch (error){
                console.error(error);
            }
        }
        fetchData();
    }, [])
    if(!user){
       window.location.href = `/login`;
    }

    if(user.role_name=="user"){
        return(
            <div>You're not authorized as Admin.</div>
        )
    }

  return (
    <div className='evtDetail'>
        <div className="container">
            <div className="top">
                <h3>Detail</h3>
             
                    <button onClick={generateTieSheet}>TieSheet</button>
            
            </div>
            <div className="bottom">
                <table>
                    <tr className='detail'>
                        <th>Team Name</th>
                        <th>Members</th>
                        <th>Description</th>
                    </tr>
                    
                    {pars.map(par => (
                        <div className="data">
                            <tr>
                                <td>{par.team_name}</td>
                                <td>{par.member}</td>
                                <td>{par.description}</td>
                            </tr>
                        </div>
                    ))}
                    
                </table>
            </div>
            {tie && (
                <div className="tieSheet">
                    <h3>Matches</h3>
                    {tie.map(t => ( 
                        <div className="list">
                            {t.map((matchup, index) => (
                                <div className='match' key={index}>
                                    <p>MatchDay {index + 1}:</p>
                                    <span>
                                        <p>{matchup[0]}</p>
                                        <p>VS</p>
                                        <p>{matchup[1]}</p>
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default EventDetail
