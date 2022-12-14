import './components.css'
import { SeedDisplay } from './SeedDisplay';

export const UserExchangeItem = ({ userData, wishlist }) => {
  const top3Items = userData.inventory.slice(0, 3);

  return (
    <div className="card">
      <div className='user-title-row'>
        <h3>{userData.name}'s seeds for exchange:</h3>
      </div>
      <div className='user-main-row'>
        <img src={userData.photo} className="user-image"/>
        {top3Items.map(seed => {
          const inWishlist = wishlist.some(wishlistedItem => wishlistedItem.name === seed.name);
          return (<SeedDisplay data={seed} wishlisted={inWishlist} />)
}       )}
      </div>
    </div>
  )
}