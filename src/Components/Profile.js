import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { db } from "../firebaseConfig";  // Firebase Firestore import
import { doc, setDoc } from "firebase/firestore";  // For saving data to Firestore


const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cities, setCities] = useState(["", "", "", "", ""]);  // State to store the list of 5 cities
  const [cityError, setCityError] = useState("");  // Error message for city validation

  // Handle Display Name Update
  const handleUpdateDisplayName = async () => {
    if (newDisplayName) {
      try {
        await updateProfile(user, { displayName: newDisplayName });
        setSuccess("Display name updated successfully!");
        setNewDisplayName("");  // Clear the input field after successful update
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Please enter a display name.");
    }
  };

  // Handle Favorite Cities Update
  const handleCityChange = (index, value) => {
    const updatedCities = [...cities];
    updatedCities[index] = value;
    setCities(updatedCities);
  };

  // Validate City Names (You can replace this with API-based validation)
  const validateCities = () => {
    return cities.every((city) => city.trim() !== "" && /^[a-zA-Z\s]+$/.test(city));
  };

  // Save Favorite Cities to Firebase Firestore
  const handleSaveCities = async () => {
    if (validateCities()) {
      try {
        // Save the cities in Firestore
        await setDoc(doc(db, "users", user.uid), {
          favoriteCities: cities,
        });

        

        setSuccess("Favorite cities saved successfully!");
        setCityError("");  // Clear city error if everything is valid
      } catch (error) {
        setCityError("Failed to save favorite cities. Please try again.");
      }
    } else {
      setCityError("Please enter valid city names.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user?.displayName || user?.email}</h2>
      <p>Manage your preferences here.</p>

      {/* Update Display Name Section */}
      <div className="input-field">
        <label htmlFor="displayName">Update Display Name</label>
        <input
          type="text"
          id="displayName"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
          placeholder="Enter new display name"
        />
        <button onClick={handleUpdateDisplayName}>Update Display Name</button>
      </div>

      {/* Add Favorite Cities Section */}
      <div className="input-field">
        <label htmlFor="favoriteCities">Enter Your 5 Favorite Cities</label>
        {cities.map((city, index) => (
          <input
            key={index}
            type="text"
            value={city}
            onChange={(e) => handleCityChange(index, e.target.value)}
            placeholder={`City ${index + 1}`}
          />
        ))}
        <button onClick={handleSaveCities}>Save Favorite Cities</button>
      </div>

      {/* Success or error messages */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      {success && <div className="success">{success}</div>}
      {cityError && <div className="error">{cityError}</div>}
    </div>
  );
};

export default Profile;