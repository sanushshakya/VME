import React from 'react'
import { Link } from 'react-router-dom'
import "./CatCard.scss"


const CatCard = ({item}) => {
  return (
    <Link to={`/category/${item._id}`}className='link'>
        <div className='catCard'>
            <img src={item.image_url} alt=""/>
            <span className='title'>{item.cat_name}</span>
            <span className='desc'>{item.description}</span>
        </div>
    </Link>
  )
}

export default CatCard
