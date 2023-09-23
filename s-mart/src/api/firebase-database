import {
  onChildAdded,
  set,
  ref,
  push,
  get,
  child,
  remove,
} from "firebase/database";
import { database } from "../firebase";

const REALTIME_DATABASE_KEY = "products";

// * load all data
export const fetchData = (callback) => {
  const productListRef = ref(database, REALTIME_DATABASE_KEY);
  onChildAdded(productListRef, callback);
};

// * get specific data
export const getSpecificData = (productKey) => {
  const productListRef = ref(database, REALTIME_DATABASE_KEY);
  get(child(productListRef, `${productKey}`))
    .then((data) => {
      if (data.exists()) {
        return data.val();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// * delete data
export const deleteData = (productKey) => {
  const productListRef = ref(
    database,
    `${REALTIME_DATABASE_KEY}/${productKey}`
  );

  remove(productListRef).then(() => {
    console.log(`${productKey} removed`);
  });
};

// TODO: update for editing product reviews and ratings
// * create new data
export const writeData = (data) => {
  const productListRef = ref(database, REALTIME_DATABASE_KEY);
  const newFruitRef = push(productListRef);

  set(newFruitRef, {
    name: data.name,
    description: data.description,
    url: data.url,
    date: new Date().toLocaleTimeString(),
  });
};

// TODO: update for editing product reviews and ratings
// * edit specific data
export const editData = (productKey, data) => {
  const productListRef = ref(
    database,
    `${REALTIME_DATABASE_KEY}/${productKey}`
  );
  set(productListRef, {
    name: data.name,
    description: data.description,
  });
};
