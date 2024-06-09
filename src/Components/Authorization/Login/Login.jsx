import { useState } from "react";
import youtubeIcon from "../../../assets/youtube.png";
import Header from "../../Header/Header";
import "./Login.css";
import { LoginValidation } from "../../../InputValidation";

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
        formData.userName === parsedUserData.userName
      ) {
        if (formData.password === parsedUserData.password) {
          console.log("Successfully logged in!");
          // Clear form data and errors on successful login
          setFormData({
            userName: "",
            password: "",
          });
        } else {
          setErrors({ password: "password not match" });
        }
      }
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
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
