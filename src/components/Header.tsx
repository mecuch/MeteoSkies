import "./Header.css";
import logo from "../assets/meteo_logo.png";

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        <img src={logo} alt="logo" className="img_logo"/>
    </h1>
      <p className="header-subtitle">Sprawdź pogodę w swoich ulubionych miastach</p>
    </header>
  );
}

export default Header;