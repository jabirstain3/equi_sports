import { createContext, useEffect } from "react";
import { useState } from "react";
import auth from "../../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState( null );
    const [ authloading , setAuthloading ] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    // Creat user
    const createUser = (email, password) =>{
        setAuthloading(true);
        return  createUserWithEmailAndPassword(auth, email, password);
    }

    // Authintication by email
    const logInUser = (email, password) =>{
        setAuthloading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
     // Authintication by google
    const googleUser = () =>{
        return signInWithPopup(auth, googleProvider);
    }

    // log out
    const logOut = () => {
        setAuthloading(true);
        return signOut(auth);
    }

    //Observe auth state change
    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, currentuser =>{
            if(currentuser){
                setUser(currentuser);
                //console.log(currentuser);
            } else setUser(null);

            setAuthloading(false);
        });
        
        return ()=> {
            unSubscribe();
        }
    },[])

    const updateUserProfile = ( updatedData ) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    return (
        <AuthContext.Provider value={{ onAuthStateChanged, user, setUser, createUser, logInUser, googleUser, authloading, updateUserProfile, logOut,}}>
            {children}
        </AuthContext.Provider>
    );
};
