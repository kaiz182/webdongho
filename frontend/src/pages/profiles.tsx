// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import {
  getMyProfile,
  updateMyProfile,
  Profile as ProfileType,
} from "../api/profile.api";

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Lấy profile khi component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getMyProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Cannot fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Xử lý update
  const handleUpdate = async () => {
    if (!profile) return;

    try {
      setUpdating(true);
      const updated = await updateMyProfile({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
        gender: profile.gender,
      });
      setProfile(updated.profile);
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading profile...</div>;
  if (error)
    return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!profile)
    return <div className="text-center mt-10">No profile found</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Full Name:</label>
        <input
          type="text"
          value={profile.full_name}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Phone:</label>
        <input
          type="text"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Address:</label>
        <input
          type="text"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold">Gender:</label>
        <select
          value={profile.gender}
          onChange={(e) =>
            setProfile({
              ...profile,
              gender: e.target.value as ProfileType["gender"],
            })
          }
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Update button */}
      <button
        onClick={handleUpdate}
        disabled={updating}
        className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition"
      >
        {updating ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
}
