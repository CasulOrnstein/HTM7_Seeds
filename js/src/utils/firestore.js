import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore/lite';

async function createNewUser(db, userData) {
  const result = await setDoc(doc(db, 'users', userData.id), {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    inventory: [],
    wishlist: []
  })

  return result;
}

export async function createNewUserIfNotExist(db, userData) {
  const result = await getUserData(db, userData.id)

  if (result) { return result }
  
  return await createNewUser(db, userData);
}

export async function getUserData(db, userId) {
  const userDoc = doc(db, 'users', userId)
  const userSnapshot = await getDoc(userDoc);
  
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.error("Failed to get data")
    return null;
  }
}

export async function getAllUsersData(db, currerntUserId) {
  const usersSnapshot = await getDocs(collection(db, "users"));

  const usersData = [] 
  usersSnapshot.forEach((doc) => {
    const data = doc.data();
    if (currerntUserId === data.id) { return }
    usersData.push(data)
  })
  
  const updatedUsers = []
  for (const userData of usersData) {
    const inv = await getUserInventory(db, userData.id);

    updatedUsers.push({ ...userData, inventory: inv })
  };

  return updatedUsers;
}

export async function getSeedData(db, seedId) {
  const seedDoc = doc(db, 'seeds', seedId)
  const seedSnapshot = await getDoc(seedDoc);
  
  if (seedSnapshot.exists()) {
    return seedSnapshot.data();
  } else {
    console.error("Failed to get seed data")
    return null;
  }
}

export async function getUserInventory(db, userId) {
  const userData = await getUserData(db, userId);

  if (userData?.inventory) {
    const inventory = [];

    for (const seedId of userData.inventory) {
      const seedData = await getSeedData(db, seedId);
      if (seedData) { inventory.push(seedData) }
    };

    return inventory;
  }

  return [];
}

export async function getUserWishlist(db, userId) {
  const userData = await getUserData(db, userId);

  if (userData?.wishlist) {
    const wishlist = [];

    for (const seedId of userData.wishlist) {
      const seedData = await getSeedData(db, seedId);
      if (seedData) { wishlist.push(seedData) }
    };

    return wishlist;
  }

  return [];
}