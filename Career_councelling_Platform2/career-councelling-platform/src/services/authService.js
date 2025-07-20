// src/services/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as updateFirebaseProfile
} from "firebase/auth";
import { auth, db } from '../features/auth/firebase';
import { ref, set, get, update } from "firebase/database";

const register = async (userData) => {
  try {
    const { email, password, name } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Add display name to the user
    if (name) {
      await updateFirebaseProfile(userCredential.user, {
        displayName: name
      });
    }

    // Create user profile in Realtime Database
    const userProfile = {
      uid: userCredential.user.uid,
      email: email,
      displayName: name || '',
      emailVerified: userCredential.user.emailVerified,
      createdAt: Date.now()
    };

    await set(ref(db, `users/${userCredential.user.uid}`), userProfile);

    return {
      user: userProfile,
      error: null
    };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    }
    
    return {
      user: null,
      error: errorMessage
    };
  }
};

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Get additional profile data from Realtime Database
    const snapshot = await get(ref(db, `users/${userCredential.user.uid}`));
    const userProfile = snapshot.exists() ? snapshot.val() : {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName || '',
      emailVerified: userCredential.user.emailVerified
    };

    return {
      user: userProfile,
      error: null
    };
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Account temporarily disabled due to many failed login attempts';
    }
    
    return {
      user: null,
      error: errorMessage
    };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateUserProfile = async (userId, profileData) => {
  try {
    // Update in Realtime Database
    const updates = {};
    for (const key in profileData) {
      updates[`users/${userId}/${key}`] = profileData[key];
    }
    await update(ref(db), updates);

    // Also update in Firebase Auth if displayName is changed
    if (profileData.displayName && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        displayName: profileData.displayName
      });
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        // Get additional profile data from Realtime Database
        const snapshot = await get(ref(db, `users/${user.uid}`));
        const userProfile = snapshot.exists() ? snapshot.val() : {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          emailVerified: user.emailVerified
        };
        resolve(userProfile);
      } else {
        resolve(null);
      }
    }, reject);
  });
};

const authStateListener = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get additional profile data from Realtime Database
      const snapshot = await get(ref(db, `users/${user.uid}`));
      const userProfile = snapshot.exists() ? snapshot.val() : {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        emailVerified: user.emailVerified
      };
      callback(userProfile);
    } else {
      callback(null);
    }
  });
};

export default {
  register,
  login,
  logout,
  updateUserProfile,
  getCurrentUser,
  authStateListener,
  auth
};


