// js/auth.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Signup ---
export const signup = async (email, password, fullName, phone) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName,
            email,
            phone,
            role: "customer",
            createdAt: new Date().toISOString()
        });

        alert("Signup successful!");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
};

// --- Login ---
export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "index.html";
    } catch (error) {
        alert(error.message);
    }
};