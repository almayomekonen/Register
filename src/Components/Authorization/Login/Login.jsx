import { useState } from "react";
import youtubeIcon from "../../../assets/youtube.png";
import Header from "../../Header/Header";
import "./Login.css";
import { LoginValidation } from "../../../InputValidation";
import { Link } from "react-router-dom";

let success;
export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleInputSave(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate input fields
    const newErrors = LoginValidation(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if the entered username and password match the signup data (stored in localStorage)
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);
      if (
        Object.keys(parsedUserData).length > 0 &&
        formData.userName === parsedUserData.userName &&
        formData.password === parsedUserData.password
      ) {
        success = "Successfully logged in!";

        setFormData({
          userName: "",
          password: "",
        });

        setErrors({});
      } else {
        setErrors({
          userName: "Username is incorrect",
          password: "Password is incorrect",
        });
      }
    } else {
      setErrors({
        userName: "Username is incorrect",
        password: "Password is incorrect",
      });
    }
  }

  return (
    <>
      <Header title="Login" description="" image={youtubeIcon} />
      <div className="container">
        <form onSubmit={handleSubmit} className="form-container-login">
          <div className="input-wrapper">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              onChange={handleInputSave}
              value={formData.userName}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputSave}
              value={formData.password}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <span className="success">{success}</span>
          <br />
          <button type="submit">Login</button>
          <br />
          <Link to="/register">Don&rsquo;t You have account yet?</Link>
        </form>
      </div>
    </>
  );
}
