import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import EditProfileForm from "../components/EditProfileForm";

const Profile = () => {
  const { user } = useUser();
  const [userEnteredPassword, setUserEnteredPassword] = useState("");
  const [allowEditProfile, setAllowEditProfile] = useState(false);

  const submitReauth = async (e) => {
    e.preventDefault();
    const credential = EmailAuthProvider.credential(
      user.email,
      userEnteredPassword
    );
    await reauthenticateWithCredential(user, credential)
      .then(() => {
        setAllowEditProfile(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!user) {
    return (
      <Navigate to="/signin" replace={true} state={{ from: "/profile" }} />
    );
  }

  return (
    <div>
      {allowEditProfile ? (
        <EditProfileForm />
      ) : (
        <div className="flex h-[70vh] justify-center items-center bg-slate-200">
          <div className="flex flex-col items-center justify-start rounded-md shadow-md ring-1 ring-gray-300 sm:max-w-sm sm:w-full bg-white">
            <h2 className="mt-12 text-xl font-bold text-gray-900">
              Please confirm your password
            </h2>
            <h4 className="mt-6 text-gray-500 text-justify w-4/5 tracking-tight">
              For added security, we require that you re-enter your password
              before editing your profile.
            </h4>
            <form
              className="flex flex-col items-center justify-center w-4/5 mt-8 mb-12 space-y-6"
              onSubmit={submitReauth}
            >
              <input
                className="block w-full mt-2 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                type="password"
                name="password"
                placeholder="Your Password"
                value={userEnteredPassword}
                required
                onChange={(e) => setUserEnteredPassword(e.target.value)}
              />

              <input
                className="flex w-full justify-center rounded-md bg-teal-600 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-teal-500"
                id="submit-button"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
