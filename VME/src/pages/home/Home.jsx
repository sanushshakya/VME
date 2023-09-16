import React, {useEffect, useState} from 'react'
import Featured from '../../components/featured/Featured'
import "./Home.scss"
import CatCard from "../../components/catCard/CatCard"
import EvtCard from '../../components/evtCard/EvtCard'
import axios from 'axios'

const Home = () => {
  const [cats, setCats] = useState([]);
  const [evts, setEvts] = useState([]);
  
  useEffect(()=>{
    const getCats = async () => {
      try{
        const resCat = await axios.get("http://localhost:8000/api/categories/read")
        const resEvt = await axios.get("http://localhost:8000/api/events/read")
        setCats(resCat.data)
        setEvts(resEvt.data)
      } catch(error) {
        console.error(error)
      }
    }
    getCats();
  }, []);
  
  return (
    <div className='home'>
      <Featured />
      <div className="cmpTitle">
        <h1>Categories</h1>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
      </div>
      <div className="slide-cat">
        {cats.slice(0, 4).map(cat => (
          <CatCard key={cat._id} item={cat}/>
        ))}
      </div>
      <div className="cmpTitle">
        <h1>Events</h1>
        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h3>
      </div>
      <div className="slide-evt">
        {evts.slice(0, 4).map(evt => (
          <EvtCard key={evt._id} item={evt}/>
        ))}
      </div>
    </div>
  )
}

export default Home;
