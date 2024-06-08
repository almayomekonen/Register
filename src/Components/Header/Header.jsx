import "./Header.css";
import propTypes from "prop-types";

export default function Header({ image, title, description }) {
  return (
    <header>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

Header.propTypes = {
  title: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
};
