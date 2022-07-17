import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { initializeFirebase } from "../configs/firebase.config";

// Initializing Firebase
initializeFirebase();

export const FirebaseAuthorization = () => {
  // State for storing user's data
  const [user, setUser] = useState({});
  // State for storing user's preference
  const [userPref, setUserPref] = useState({});
  // State for storing error
  const [error, setError] = useState({});
  // State for storing success message
  const [success, setSuccess] = useState("");
  // State for Loading
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setReFetch] = useState(1);
  const auth = getAuth();
  const db = getDatabase();

  //
  const GetDoc = () => {
    const { uid } = user;
    useEffect(() => {
      const getUsers = () => {
        get(child(ref(db), `users/${uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setUserPref(snapshot.val());
          }
        });
      };
      getUsers();
    }, [uid, reFetch]);
  };
  const AddDoc = (email, username, uid, units) => {
    // const { uid, displayName, email } = user;
    return set(ref(db, `users/${uid}`), {
      email,
      username,
      units: units || "metric",
    }).then(() => {
      setReFetch(reFetch + 1);
    });
  };

  //
  // This will create account by Email and Password
  const CreateUserWithEmailAndPassword = (email, password, username) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError("");
        Upsert(email, username);
        AddDoc(user.email, user.displayName, user.uid);
        setUsername(username);
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };
  const SendPasswordRecoveryEmail = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("");
        setSuccess("Password recovery email sent successfully");
      })
      .catch((err) => setError(err));
  };

  // This will sign in with Email and Password
  const SignInWithEmailAndPassword = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        Upsert(user.email, user.displayName);
        AddDoc(user.email, user.displayName, user.uid);
        setError("");
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  // This will sign in with GoogleAuthProvider
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        Upsert(user.email, user.displayName);
        AddDoc(user.email, user.displayName, user.uid);
        setError("");
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };
  const setUsername = (username) => {
    updateProfile(auth.currentUser, { displayName: username }).then(
      (res) => {}
    );
  };
  const Upsert = (email, name) => {
    // putData("/users", { email, name }).then((res) => {});
  };

  // This will sign out the user when specific button got clicked
  const SignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
        setError("");
      })
      .catch((err) => {
        setError(err);
      });
  };
  // On Auth State
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // Returning all these necessary function as an object
  return {
    CreateUserWithEmailAndPassword,
    SignInWithEmailAndPassword,
    SignInWithGoogle,
    user,
    error,
    setSuccess,
    success,
    SendPasswordRecoveryEmail,
    setError,
    setUserPref,
    isLoading,
    SignOut,
    GetDoc,
    AddDoc,
    userPref,
  };
};
