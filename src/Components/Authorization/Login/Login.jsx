import Header from "../../Header/Header";
import youtubeIcon from "../../../assets/youtube.png";
import { LoginValidation } from "../../../InputValidation";

import "./Login.css";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleInputSave(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = LoginValidation(formData);
    if (Object.keys(newErrors).length === 0) {
      console.log("successfully loged in!", formData);

      setFormData({
        userName: "",
        password: "",
      });

      setErrors({});
    } else {
      setErrors(newErrors);
      console.log("Login failed please Try again later...");
    }
  }

  return (
    <>
      <Header title="Login" description="" image={youtubeIcon} />
      <div className="container">
        <form onSubmit={handleSubmit} className="form-container-login">
          <div className="input-wrapper">
            <label htmlFor="userName">userName</label>
            <input
              type="text"
              name="userName"
              onChange={handleInputSave}
              value={formData.userName}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleInputSave}
              value={formData.password}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <br />

          <button onClick={handleSubmit}>SUBMIT</button>
        </form>
      </div>
    </>
  );
}
