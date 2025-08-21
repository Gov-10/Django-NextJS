"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/profile/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setError("Unauthorized or expired token.");
        }
      } catch (err) {
        setError("Error fetching profile.");
      }
    }

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Description:</strong> {profile.description}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}
