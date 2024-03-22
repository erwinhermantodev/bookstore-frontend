import React, { useState } from "react";
import "./LoginPage.css";

interface LoginResponse {
  success: boolean;
  token: string;
}

const LoginPage: React.FC<{ onLogin: (token: string) => void }> = ({
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        onLogin(response.token);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

async function loginUser(
  username: string,
  password: string
): Promise<LoginResponse> {
  // Simulate API call to authenticate user
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        resolve({ success: true, token: "sample-token" });
      } else {
        resolve({ success: false, token: "" });
      }
    }, 1000); // Simulate delay of 1 second
  });
}

export default LoginPage;
