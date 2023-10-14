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
const REVIEW_DATABASE_KEY = "products";
const USER_DATABASE_KEY = "users";
const ORDER_DATABASE_KEY = "orders";

// * load all data
export const fetchReviewData = (productTitle, callback) => {
  const productListRef = ref(
    database,
    `${REVIEW_DATABASE_KEY}/${productTitle}`
  );
  onChildAdded(productListRef, callback);
};

export const fetchOrderData = (userId, callback) => {
  const orderRef = ref(database, `${ORDER_DATABASE_KEY}/${userId}`);
  onChildAdded(orderRef, callback);
};

export const fetchUserData = (callback) => {
  const userRef = ref(database, `${USER_DATABASE_KEY}`);
  onChildAdded(userRef, callback);
};
// * get specific data
export const getSpecificData = (productTitle) => {
  const productListRef = ref(database, REVIEW_DATABASE_KEY);
  get(child(productListRef, `${productTitle}`))
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
  const productListRef = ref(database, `${REVIEW_DATABASE_KEY}/${productKey}`);
  remove(productListRef).then(() => {
    console.log(`${productKey} removed`);
  });
};

// * create new data
export const writeReviewData = (
  userId,
  reviewText,
  reviewImages,
  reviewStars,
  productTitle
) => {
  const productListRef = ref(
    database,
    `${REVIEW_DATABASE_KEY}/${productTitle}`
  );
  const newReviewRef = push(productListRef);
  set(newReviewRef, {
    userId: userId,
    reviewText: reviewText,
    reviewImages: reviewImages,
    reviewStars: reviewStars,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  });
};

export const writeOrderData = (userId, orderData, totalAmt) => {
  const orderRef = ref(database, `${ORDER_DATABASE_KEY}/${userId}`);
  const newOrderRef = push(orderRef);
  set(newOrderRef, {
    userId: userId,
    orderData: orderData,
    totalAmt: totalAmt,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  });
};

// * edit specific data
export const editUserData = (user) => {
  const userRef = ref(database, `${USER_DATABASE_KEY}/${user.uid}`);
  set(userRef, {
    id: user.uid,
    name: user.displayName ? user.displayName : user.email,
    photo: user.photoURL ? user.photoURL : null,
  });
};
