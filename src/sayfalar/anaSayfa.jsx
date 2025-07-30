import React from 'react';
import { useHistory } from 'react-router-dom';
import './anaSayfa.css';


const Home = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/siparis");
  };

  return (
    <>
      <div className="hero-banner">
        <div className="hero-content">
          <img src='./images/iteration-1-images/logo.svg' alt='logo' className='logo' />
          <p className='yazi'>KOD ACIKTIRIR</p>
          <p className='yazi2'>PİZZA, DOYURUR</p>
          <button className='aciktim' onClick={handleClick}>ACIKTIM</button>
        </div>
      </div>
      <header>
        <div className="category-header">
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/1.svg" alt="Kore" />
    <span>YENİ! Kore</span>
  </div>
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/2.svg" alt="Pizza" />
    <span>Pizza</span>
  </div>
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/3.svg" alt="Burger" />
    <span>Burger</span>
  </div>
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/4.svg" alt="Kızartmalar" />
    <span>Kızartmalar</span>
  </div>
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/5.svg" alt="Fast Food" />
    <span>Fast Food</span>
  </div>
  <div className="category-item">
    <img src="./images/iteration-1-images/iconlar/6.svg" alt="Gazlı İçecek" />
    <span>Gazlı İçecek</span>
  </div>
</div>
</header>


<footer className="site-footer">
  <div className="footer-container">
    <div className="footer-column">
      <img className="footer-title" src="./images/iteration-1-images/logo.svg" alt="Teknolojik Yemekler" />
      <ul className="footer-contact">
        <li><img src="./images/iteration-1-images/iconlar/icon-1.png" alt="konum" /> 341 Londonderry Road, Istanbul Türkiye</li>
        <li><img src="./images/iteration-1-images/iconlar/icon-2.png" alt="mail" /> aciktim@teknolojikyemekler.com</li>
        <li><img src="./images/iteration-1-images/iconlar/icon-3.png" alt="telefon" /> +90 216 123 45 67</li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Hot Menu</h3>
      <ul className="footer-links">
        <li>Terminal Pizza</li>
        <li>5 Kişilik Hackathlon Pizza</li>
        <li>useEffect Tavuklu Pizza</li>
        <li>Beyaz Console Frosty</li>
        <li>Testler Geçti Mutlu Burger</li>
        <li>Position Absolute Acı Burger</li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Instagram</h3>
      <div className="footer-gallery">
        <img src="./images/iteration-2-images/footer/insta/li-0.png" alt="1" />
        <img src="./images/iteration-2-images/footer/insta/li-1.png" alt="2" />
        <img src="./images/iteration-2-images/footer/insta/li-2.png" alt="3" />
        <img src="./images/iteration-2-images/footer/insta/li-3.png" alt="4" />
        <img src="./images/iteration-2-images/footer/insta/li-4.png" alt="5" />
        <img src="./images/iteration-2-images/footer/insta/li-5.png" alt="6" />
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2023 Teknolojik Yemekler.</p>
  </div>
</footer>



</>

  );
};

export default Home;
