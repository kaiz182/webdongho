// src/pages/Profile.tsx
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  createProfile,
  clearProfile,
} from "../redux/profileSlice";
import { RootState, AppDispatch } from "../redux/store";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profileState = useSelector((state: RootState) => state.profile);
  const { profile, loading, error } = profileState;

  const [avatar, setAvatar] = useState<File | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Lấy user_id từ localStorage (hoặc từ auth slice)
  const user_id = localStorage.getItem("user_id") || "";

  useEffect(() => {
    if (user_id) {
      dispatch(fetchProfile(user_id));
    }

    return () => {
      dispatch(clearProfile());
    };
  }, [dispatch, user_id]);

  useEffect(() => {
    if (profile) {
      setPhone(profile.phone_number || "");
      setAddress(profile.address || "");
      setCity(profile.city || "");
      setCountry(profile.country || "");
    }
  }, [profile]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user_id) return;

    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("phone_number", phone);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("country", country);

    try {
      if (profile) {
        await dispatch(updateProfile({ user_id, data: formData })).unwrap();
        alert("Profile updated successfully!");
      } else {
        await dispatch(createProfile(formData)).unwrap();
        alert("Profile created successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Avatar:</label>
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="avatar"
              className="w-24 h-24 object-cover rounded-full mb-2"
            />
          )}
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

        <div>
          <label className="block mb-1">Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label className="block mb-1">Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {profile ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
