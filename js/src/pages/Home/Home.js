import { useContext, useEffect, useState } from 'react';
import { getFirestore } from 'firebase/firestore/lite';

import { FirebaseAppContext } from '../../contexts/FirebaseContext';
import { UserContext } from '../../contexts/UserContext';
import './Home.css';
import { getUserData, getUserInventory, getUserWishlist } from '../../utils/firestore';
import { SeedDisplay } from '../../components/SeedDisplay';

function Home() {
  const [userData, setUserData] = useState({})
  const [userInventory, setUserInventory] = useState([])
  const [userWishlist, setUserWishlist] = useState([])

  const firebaseApp = useContext(FirebaseAppContext);
  const user = useContext(UserContext);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    async function getData () {
      const result = await getUserData(db, user.id);
      setUserData(result);
      const seedInv = await getUserInventory(db, user.id);
      setUserInventory(seedInv);
      const seedWishlist = await getUserWishlist(db, user.id);
      setUserWishlist(seedWishlist);
    }

    getData();
  }, [user.id])


  return (
    <div className="App">
      <h1>Welcome {userData.name}</h1>
      <div>
        <h2>Inventory:</h2>
        {userInventory.map(seed => <SeedDisplay data={seed} />)}
      </div>
      <div>
        <h2>Wishlist:</h2>
        {userWishlist.map(seed => <SeedDisplay data={seed} />)}
      </div>
    </div>
  );
}

export default Home;
