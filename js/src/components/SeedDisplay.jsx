import './components.css'
import star from '../images/star.png'

export const SeedDisplay = ({ data, wishlisted }) => {
  return (
    <div className="seed-display">
      <img src={data.flowerImageUrl} className="main-image"/>
      <img src={data.seedImageUrl} className="seed-image"/>
      {wishlisted && <img src={star} className='user-star'/>}
    </div>
  )
};