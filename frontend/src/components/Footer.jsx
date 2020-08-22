import React from "react";
import "./style/Footer.scss";
const Footer = () => {
  return (
    <footer>
      <div className="leftSide">
        <p>
          made with&nbsp;
          <span role="img" aria-label="heart">
            ❤️
          </span>
          &nbsp;at
        </p>
        <a href="https://www.wildcodeschool.com/fr-FR" target="blank">
          &nbsp;wild code school&nbsp;
          <img
            id="wcs-logo"
            src="https://www.wildcodeschool.com/assets/logo_white-b3ba5f88186df8d04f5ef8be4c3cc057a49f77b25b2359c4f4b3b13c53e5aeb8.png"
            alt="WCS logo"
          ></img>
        </a>
      </div>
      <div className="rightSide">
        <p>by :&nbsp;</p>
        <a
          className="github-link"
          href="https://github.com/Gumatan/Picross-R"
          target="blank"
        >
          Gumatan&nbsp;
          <img src="/github-logo.png" alt="github logo" />
        </a>
        <p>&nbsp;|</p>
        <a
          className="linked-link"
          href="https://www.linkedin.com/in/arnautdemaret/"
          target="blank"
        >
          &nbsp;Arnaut&nbsp;
          <img src="/linked-in-logo.png" alt="linked-in logo"></img>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
