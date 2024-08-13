import { storage } from "../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const PROFILE_STORAGE_KEY = "images/profile/";
const REVIEW_STORAGE_KEY = "images/review/";

export const uploadProfileImage = async (fileInputFile) => {
  const fullStorageRef = storageRef(
    storage,
    PROFILE_STORAGE_KEY + fileInputFile.name
  );
  await uploadBytes(fullStorageRef, fileInputFile);
  const url = await getDownloadURL(fullStorageRef, fileInputFile.name);
  return url;
};

export const uploadReviewImage = async (fileInputFile) => {
  const fullStorageRef = storageRef(
    storage,
    REVIEW_STORAGE_KEY + fileInputFile.name
  );
  await uploadBytes(fullStorageRef, fileInputFile);
  const url = await getDownloadURL(fullStorageRef, fileInputFile.name);
  return url;
};
