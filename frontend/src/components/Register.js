import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;
