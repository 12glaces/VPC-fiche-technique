import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.styles.scss";
import logo from "../../assets/RdvSt-Hilaire-de-Chaleons.png";
const Login = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === process.env.REACT_APP_LOGIN_CODE) {
      localStorage.setItem("authenticated", "true");
      navigate("/fiche");
    }
    else {
      setError("Code incorrect");
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo">
          <img src={logo} alt="VPC-logo"/>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="code">Entrez le code</label>
          <input
            id="code"
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="••••••••••"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Se connecter</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
