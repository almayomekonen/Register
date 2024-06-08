import { useState } from "react";
import youtubeIcon from "../../../assets/youtube.png";
import Header from "../../Header/Header";
import { InputValidation } from "../../../InputValidation";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  //making the UI changes visible to the users;
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    passwordValidation: "",
    publicName: "",
    uploadImage: null,
  });

  const navigate = useNavigate();
  //making the UI changes visible to the users;
  const [errors, setErrors] = useState({});

  const [imageUrl, setImageUrl] = useState(null);

  // not working with dataBase;
  function handleInputSave(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value === null ? "" : value,
      };
    });
  }

  // event represent the form input sending;
  // prevents the event to our needs "hey stop ✋";

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = InputValidation(formData);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form SuccessFully submitted!", formData);

      setFormData({
        userName: "",
        password: "",
        passwordValidation: "",
        publicName: "",
        uploadImage: null,
      });

      setErrors({});
      navigate("/login");
    } else {
      setErrors(newErrors);
      console.log("Form Validation Failed please fill out the inputs!");
    }
  }

  function handleImage(event) {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      uploadImage: file,
    });

    if (file) {
      setImageUrl(URL.createObjectURL(file));
    } else {
      setImageUrl(null);
    }
  }

  return (
    <>
      <div className="form-container">
        <Header
          title="Signup"
          image={youtubeIcon}
          description="Please fill out the form."
        />
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="userName">userName</label>
            <input
              type="text"
              name="userName"
              value={formData.userName || ""}
              placeholder="userName"
              onChange={handleInputSave}
            />
            {errors.userName && <p className="error">{errors.userName}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              placeholder="Password"
              onChange={handleInputSave}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="passwordvalidation">Password Validation</label>
            <input
              type="password"
              name="passwordValidation"
              value={formData.passwordValidation || ""}
              placeholder="Password Validation"
              onChange={handleInputSave}
            />
            {errors.passwordValidation && (
              <p className="error">{errors.passwordValidation}</p>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="publicName">Public Name</label>
            <input
              type="text"
              name="publicName"
              value={formData.publicName || ""}
              placeholder="Public Name"
              onChange={handleInputSave}
            />
            {errors.publicName && <p className="error">{errors.publicName}</p>}
          </div>

          <div className="input-wrapper">
            <label htmlFor="uploadImage">Upload Image</label>
            <input type="file" name="uploadImage" onChange={handleImage} />
            {errors.uploadImage && (
              <p className="error">{errors.uploadImage}</p>
            )}
            {imageUrl && <img src={imageUrl} alt="selected-image" />}
          </div>

          <button onClick={handleSubmit}>SUBMIT</button>
        </form>
      </div>
    </>
  );
}
