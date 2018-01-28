import React from "react";
import Login from "./form/Login";
import Signup from "./form/Signup";
import "./Article.css";

class Article extends React.Component {
  state = {
    haveAccount: false
  };

  render() {
    let auth = <Login />;
    if (!this.state.haveAccount) {
      auth = <Signup />;
    }

    return (
      <div className="page__section page__section__article" id="login">
        {auth}
      </div>
    );
  }
}

export default Article;
