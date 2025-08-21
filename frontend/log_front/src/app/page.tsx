"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password1 !== password2) {
      window.alert("passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password: password1,
          description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        router.push("/dashboard");
      } else {
        window.alert("Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      window.alert("An unexpected error occurred");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        /><br />
        <label>Enter password: </label>
        <input
          type="password"
          required
          placeholder="enter password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        /><br />
        <label>Confirm password: </label>
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm password"
        /><br />
        <label>Enter email: </label>
        <input
          type="email"
          required
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label>Describe yourself: </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe yourself"
          rows={4}
          cols={50}
        /><br />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default LoginPage;