import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input placeholder="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={resetPassword}>Reset</button>
    </div>
  );
};

export default ResetPassword;
