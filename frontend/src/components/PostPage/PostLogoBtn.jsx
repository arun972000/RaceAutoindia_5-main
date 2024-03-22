import "./LogoButtons.css"; // Import your CSS file

const LogoButtons = () => {
  return (
    <div className="logo-buttons-container mt-3 mb-2">
      <a href="#" className="logo-button youtube">
        <i className="fab fa-youtube"></i>
      </a>
      <a href="#" className="logo-button facebook">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="#" className="logo-button twitter">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="logo-button instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className="logo-button linkedin">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="#" className="logo-button whatsapp">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href="#" className="logo-button pinterest">
        <i className="fab fa-pinterest"></i>
      </a>
    </div>
  );
};

export default LogoButtons;
