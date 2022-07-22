import { BadgeCheckIcon } from "@heroicons/react/solid";
import React from "react";
import { useRootContext } from "../../../hooks/useRootContext";

const Profile = () => {
  const { photoURL, displayName, email } = useRootContext().user; // Destructuring these from useAuth()[0].user
  return (
    <div className="mt-10 min-h-screen flex flex-col items-center">
      <div className="w-4/5 mx-auto border p-5 rounded-lg">
        <img
          src={photoURL || "https://i.ibb.co/pnT0NpF/default-avatar.jpg"}
          className="rounded-full mx-auto text-center w-24"
          alt={`${displayName} img`}
        />
        <div className="text-center mt-5">
          <div className="flex justify-center items-center space-x-1">
            <p className="font-medium">
              {displayName ? displayName : email?.split("@")[0]}
            </p>
            <button disabled title="Verified User">
              <BadgeCheckIcon title={"Verified"} className="w-5" />
            </button>
          </div>
          <p className="font-medium text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
