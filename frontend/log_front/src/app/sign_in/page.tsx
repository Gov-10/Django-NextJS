"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
function SignInPage()
{
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e:any)
    {
       e.preventDefault();
       try {
           const res = await fetch("http://localhost:8000/api/login/", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({
                   username,
                   password,
               }),
           });

           const data = await res.json();

           if (res.ok) {
               localStorage.setItem("access_token", data.access);
               localStorage.setItem("refresh_token", data.refresh);
               router.push("/dashboard");
           } else {
               window.alert("Login failed");
           }
       } catch (err) {
           console.error("Login error:", err);
           window.alert("An unexpected error occurred");
       }
    }
    return(
        <>
         <h1>Sign In</h1>
         <form onSubmit={handleSubmit}>
           <label>Enter username: </label>
           <input
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            required
            placeholder="Enter your username"
           />
           <br />
           <label>Enter Password:  </label>
           <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            placeholder="Enter your password"
           />
           <button type="submit">Sign In</button>
         </form>
        </>
    );
}
export default SignInPage;