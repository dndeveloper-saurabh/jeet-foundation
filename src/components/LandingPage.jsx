import React, {useEffect} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function LandingPage() {

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/Vector1.png';
    document.title = 'Jeet Foundation';
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
