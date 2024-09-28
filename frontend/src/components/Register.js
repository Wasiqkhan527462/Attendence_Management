import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the updated CSS file

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const { register, user } = useAuth(); // Changed currentUser to user
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if the user is logged in and is an admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // Redirect to login if not an admin
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear any previous error

    try {
      await register(email, password, role);
      alert("Registration successful!");
      navigate("/admin"); // Redirect after successful registration
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2> {/* Added heading for clarity */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  );
};

export default Register;
