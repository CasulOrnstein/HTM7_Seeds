import { useContext, useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore/lite';

import { FirebaseAppContext } from '../../contexts/FirebaseContext';
import { UserContext } from '../../contexts/UserContext';
import './Home.css';
import { getUserData, getUserInventory, getUserWishlist, getAllUsersData } from '../../utils/firestore';
import { SeedDisplay } from '../../components/SeedDisplay';

import background from '../../images/abstract_background.png'
import notebook from '../../images/notebook.png'
import folder from '../../images/folder.png'
import { UserExchangeItem } from '../../components/UserExchangeItem';

function Home() {
  const [wishlistTabSelected, setWishlistTab] = useState(false);

  const [userData, setUserData] = useState({})
  const [userInventory, setUserInventory] = useState([])
  const [userWishlist, setUserWishlist] = useState([])
  const [usersList, setUsersList] = useState([])

  const firebaseApp = useContext(FirebaseAppContext);
  const user = useContext(UserContext);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    async function getData () {
      const result = await getUserData(db, user?.id);
      setUserData(result);
      const seedInv = await getUserInventory(db, user?.id);
      setUserInventory(seedInv);
      const seedWishlist = await getUserWishlist(db, user?.id);
      setUserWishlist(seedWishlist);
      const allUsersList = await getAllUsersData(db, user?.id);
      setUsersList(allUsersList);
    }

    getData();
  }, [user?.id])


  return (
    <div className="wrapper" style={{ backgroundImage: `url(${background})`}}>
      <div className="lhs">
        <h1 className="welcome-title">Welcome {userData.name}</h1>
        <Folder inventory={userInventory} wishlist={userWishlist} wishlistTabSelected={wishlistTabSelected} setWishlistTab={setWishlistTab}/>
        {/* <h1>Welcome {userData.name}</h1>
        <div>
          <h2>Inventory:</h2>
          {userInventory.map(seed => <SeedDisplay data={seed} />)}
        </div>
        <div>
          <h2>Wishlist:</h2>
          {userWishlist.map(seed => <SeedDisplay data={seed} />)}
        </div> */}
      </div>
      <div className="rhs">
        <Notebook usersList={usersList} />
      </div>

      
    </div>
  );
}

const Folder = ({ inventory, wishlist, wishlistTabSelected, setWishlistTab}) => {
  const displayedItems = wishlistTabSelected ? wishlist : inventory;
  
  return (<div className='folder-container'>
    <img src={folder} style={{width: '100%'}} />
    <div className='folder-tabs'>
      <div className={`folder-tab ${wishlistTabSelected ? '' : 'selected'}`} onClick={() => setWishlistTab(false)}>Your seeds</div>
      <div className={`folder-tab ${wishlistTabSelected ? 'selected' : ''}`} onClick={() => setWishlistTab(true)}>Wishlist</div>
    </div>
    <div className='folder-contents'>
      {displayedItems.map(seed => <SeedDisplay data={seed} />)}
    </div>
  </div>)
}

const Notebook = ({usersList}) => {
  return (<div className='notebook-container'>
    <img src={notebook}/>
    <div className='notebook-contents'>
      <h1 className='notebook-title'>Exchange</h1>
      <div className='notebook-items'>
        {usersList.map(user => <UserExchangeItem userData={user}/>)}
      </div>
    </div>
  </div>)
}



export default Home;
