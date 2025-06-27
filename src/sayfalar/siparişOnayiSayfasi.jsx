import React, { useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./siparişOnayiSayfasi.css";

const SiparisOnay = () => {
  const [siparis, setSiparis] = useState(null);
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  useEffect(() => {
    const sonSiparis = localStorage.getItem("sonSiparis");
    if (sonSiparis) {
      setSiparis(JSON.parse(sonSiparis));
    }
  }, []);

  return (
    <><div className="siparisOnaySayfasi">  
    <img src="./images/iteration-1-images/logo.svg" alt="logo" className="sonlogo" />
    <div className="yazilar">
      <h1 className="sonyazi">Lezzet yolda</h1>
      <h1 className="sonyazi2">SİPARİŞ ALINDI</h1>
    </div>
    <hr className="beyaz-cizgi" />
     {siparis && (
  <>
    <div className="siparis-detay-kutu">
      <h2>Position Absolute Acı Pizza</h2>
      <p><strong>Boyut:</strong> {siparis.boyut}</p>
      <p><strong>Hamur:</strong> {siparis.hamur}</p>
      <p className="malzeme-listesi"><strong>Malzemeler:</strong> {siparis.malzemeler.join(", ")}</p>
      <p><strong>Not:</strong> {siparis.özel || "Yok"}</p>
            <p><strong>İsim:</strong> {siparis.isim || "Belirtilmedi"}</p>

      <p><strong>Adet:</strong> {siparis.adet}</p>
    </div>

    
    <div className="toplam-kutu">
      <h3>Sipariş Toplamı</h3>
      <div className="satir">
        <span>Seçimler</span>
        <span>{(siparis.malzemeler.length * 5).toFixed(2)}₺</span>
      </div>
      <div className="satir toplam">
  <span>Toplam</span>
  <span>
    {Number(siparis.toplam).toFixed(2)}₺
  </span>
</div>

      <button className="AnaSayfaDonus" onClick={() => {handleClick()

    }}>Ana Sayfaya Dön</button>
    </div>
  </>
  
)}
    </div>

    

    </>
    
  );
};

export default SiparisOnay;
