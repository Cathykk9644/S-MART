import { storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const PRODUCT_STORAGE_KEY = "images/products/";

export const uploadImage = async (fileInputFile) => {
  const fullStorageRef = storageRef(
    storage,
    PRODUCT_STORAGE_KEY + fileInputFile.name
  );
  await uploadBytes(fullStorageRef, fileInputFile);
  const url = await getDownloadURL(fullStorageRef, fileInputFile.name);
  return url;
};
