import {
createUserWithEmailAndPassword,
onAuthStateChanged,
signInWithEmailAndPassword,
signOut,
User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

type AuthContextType = {
user: User | null;
login: (email: string, password: string) => Promise<any>;
signup: (
email: string,
password: string,
name: string,
age: number,
height: string,
weight: string
) => Promise<void>;
logout: () => Promise<void>;
loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const unsub = onAuthStateChanged(auth, (usr) => {
setUser(usr);
setLoading(false);
});
return () => unsub();
}, []);

const login = (email: string, password: string) =>
signInWithEmailAndPassword(auth, email, password);

const signup = async (
email: string,
password: string,
name: string,
age: number,
height: string,
weight: string
) => {
const userCredential = await createUserWithEmailAndPassword(
auth,
email,
password
);
const createdUser = userCredential.user;

// Create user profile document in Firestore
await setDoc(doc(db, "users", createdUser.uid), {
  name,
  email,
  age,
  height,
  weight,
});


};

const logout = () => signOut(auth);

return (
<AuthContext.Provider
value={{
user,
login,
signup,
logout,
loading,
}}
>
{children}
</AuthContext.Provider>
);
}

export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
throw new Error("useAuth must be used within AuthProvider");
}
return context;
};