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

// * load all data
export const fetchReviewData = (productTitle, callback) => {
  const productListRef = ref(
    database,
    `${REVIEW_DATABASE_KEY}/${productTitle}`
  );
  onChildAdded(productListRef, callback);
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
// export const writeData = (data) => {
//   const productListRef = ref(database, REVIEW_DATABASE_KEY);
//   const newReviewRef = push(productListRef);

//   set(newReviewRef, {
//     name: data.name,
//     description: data.description,
//     url: data.url,
//     date: new Date().toLocaleTimeString(),
//   });
// };

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

// * edit specific data
// export const editData = (productKey, data) => {
//   const productListRef = ref(database, `${REVIEW_DATABASE_KEY}/${productKey}`);
//   set(productListRef, {
//     name: data.name,
//     description: data.description,
//   });
// };
