import React, { useState } from "react";
import { useUser } from "../contexts/userContext";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

const EditProfileForm = () => {
  const { user } = useUser();
  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    retypePassword: "",
  });

  const updateDisplayName = () => {
    updateProfile(user, { displayName: newDisplayName })
      .then(() => {
        console.log("display name updated, user:", user);
        setNewDisplayName("");
      })
      .catch((error) => console.log(error));
  };

  const updateUserEmail = () => {
    updateEmail(user, newEmail)
      .then(() => {
        console.log("email updated, user:", user);
        setNewEmail("");
      })
      .catch((error) => console.log(error));
  };

  const updateUserPassword = () => {
    if (
      newPassword.password &&
      newPassword.password === newPassword.retypePassword
    ) {
      updatePassword(user, newPassword.password)
        .then(() => {
          console.log("password updated");
          setNewPassword({
            password: "",
            retypePassword: "",
          });
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="flex h-[70vh] justify-center items-center bg-slate-200">
      <div className="flex items-center justify-around h-full sm:max-w-[60vw] sm:w-full bg-white">
        {/* Update profile details other than display picture */}
        <div className="flex flex-col items-center justify-start w-3/5 h-5/6 px-7 space-y-6">
          {/* Update email */}
          <div className="w-full">
            <label className="block text-gray-900">Email</label>
            <div className="flex items-center space-x-6 mt-2">
              <input
                className="block w-3/5 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                type="text"
                name="email"
                placeholder={user ? user.email : "Your Email"}
                value={newEmail}
                required
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button
                onClick={updateUserEmail}
                className="flex w-1/3 justify-center items-center rounded-md py-1 bg-teal-600 text-sm leading-6 text-white shadow-sm hover:bg-teal-500"
              >
                Update Email
              </button>
            </div>
          </div>
          {/* Update display name */}
          <div className="w-full">
            <label className="block text-gray-900">Name</label>
            <div className="flex items-center space-x-6 mt-2">
              <input
                className="block w-3/5 rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                type="text"
                name="email"
                placeholder={
                  user && user.displayName
                    ? user.displayName
                    : "No display name"
                }
                value={newDisplayName}
                required
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
              <button
                onClick={updateDisplayName}
                className="flex w-1/3 justify-center items-center rounded-md py-1 bg-teal-600 text-sm leading-6 text-white shadow-sm hover:bg-teal-500"
              >
                Update Name
              </button>
            </div>
          </div>
          {/* Update password */}
          <div className="w-full">
            <label className="block text-gray-900">Password</label>

            <div className="flex items-start space-x-6 mt-2">
              <div className="flex flex-col w-3/5 space-y-2">
                <input
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  type="password"
                  name="password"
                  placeholder={"New Password"}
                  value={newPassword.password}
                  required
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <input
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  type="password"
                  name="retypePassword"
                  placeholder={"Retype Password"}
                  value={newPassword.retypePassword}
                  required
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col w-1/3 space-y-2">
                <button
                  onClick={updateUserPassword}
                  className="flex w-full justify-center items-center rounded-md py-1 bg-teal-600 text-sm leading-6 text-white shadow-sm hover:bg-teal-500"
                >
                  Update Password
                </button>
                {newPassword.password === newPassword.retypePassword ? (
                  <br />
                ) : (
                  <div className="text-sm tracking-tight text-red-700 leading-8">
                    Passwords must match.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Update display picture */}
        <div className="flex flex-col items-center justify-start w-2/5 h-5/6 border-l-2">
          Add function to upload display picture
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
