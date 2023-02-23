import React from "react";
import Header from "./Header";
import MainBody from "./MainBody";
import Footer from "./Footer";

class Page extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainBody />
        <Footer />
      </div>
    );
  }
}

export default Page;
