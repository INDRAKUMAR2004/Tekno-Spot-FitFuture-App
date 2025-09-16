import React, { createContext, useContext, useState } from "react";

type Profile = {
  name: string;
  email: string;
  phone: string;
  weight: string;
  height: string;
};

type ProfileContextType = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({
    name: "Pavithra",
    email: "madisons@example.com",
    phone: "+91 987654321",
    weight: "75 Kg",
    height: "1.65 CM",
  });

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
