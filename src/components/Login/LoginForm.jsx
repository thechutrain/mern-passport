import React from "react";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";

export default () => (
  <div className="LoginForm">
    <a href="/auth/google">
      <img src={googleButton} alt="sign into Google Button" />
    </a>{" "}
    <a href="/auth/tumblr">Tumblr somehow</a>
  </div>
);
