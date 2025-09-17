import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

type Profile = {
  name: string;
  email: string;
  age: number;
  height: string;
  weight: string;
};

type ProfileContextType = {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, async (user) => {
if (user) {
try {
const userRef = doc(db, "users", user.uid);
const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data() as Profile; // Cast the data to Profile type

      // Optionally, validate required fields exist
      if (
        userData.name &&
        userData.email &&
        userData.age &&
        userData.height &&
        userData.weight
      ) {
        setProfile(userData);
      } else {
        console.warn("Incomplete profile data in Firestore.");
        setProfile(null);
      }
    } else {
      console.warn("No user profile found in Firestore.");
      setProfile(null);
    }
  } catch (err) {
    console.error("Error fetching user profile:", err);
  }
} else {
  setProfile(null);
}


});

return () => unsubscribe();
}, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
