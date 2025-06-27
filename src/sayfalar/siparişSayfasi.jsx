import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import "./siparişSayfasi.css";


const malzemeListesi = [
  "Pepperoni", "Domates", "Biber", "Sosis", "Mısır", "Sucuk",
  "Turşu", "Cheddar", "Mozarella", "Jalepeno",
  "Soğan", "Sarımsak", "Kavurma", "Zeytin", "Ananas",
];


const SiparisFormu = () => {
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    boyut: "",
    hamur: "",
    malzemeler: [],
    özel: "",
    adet: 1,
    isim: "",
    toplam: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let updated = [...formData.malzemeler];
      if (checked) {
        if (updated.length < 10) updated.push(value);
      } else {
        updated = updated.filter((item) => item !== value);
      }
      setFormData({ ...formData, malzemeler: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdet = (yön) => {
    setFormData(prev => ({
      ...prev,
      adet: yön === "+" ? prev.adet + 1 : Math.max(1, prev.adet - 1)
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.boyut) newErrors.boyut = "Boyut seçilmeli";
    if (!formData.hamur) newErrors.hamur = "Hamur seçilmeli";
    if ( formData.malzemeler.length<4||formData.malzemeler.length > 10)
      newErrors.malzemeler = "En az 4, En fazla 10 malzeme seçebilirsiniz";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = validate();
  if (!isValid) return;

  setSubmitting(true);
  try {
    const ekstraFiyat = formData.malzemeler.length * 5;
    const toplamFiyat = (85.5 + ekstraFiyat) * formData.adet;

    const guncellenmisForm = {
      ...formData,
      toplam: toplamFiyat,
    };

    localStorage.setItem("sonSiparis", JSON.stringify(guncellenmisForm));

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      guncellenmisForm,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Sipariş Özeti:", response.data);
    history.push("/onay");

  } catch (error) {
    console.error("❌ Sipariş Gönderim Hatası:", error);
  } finally {
    setSubmitting(false);
  }
};


 


  const ekstraFiyat = formData.malzemeler.length * 5;
  const toplamFiyat = 85.5 + ekstraFiyat;

  return (
    <>
      <header className="header">
        <img src="./images/iteration-1-images/logo.svg" alt="logo" className="ikilogo" />
        <div className="sekmeler">
          <span>Anasayfa</span> - <span>Seçenekler</span> - <strong>Sipariş Oluştur</strong>
        </div>
      </header>

      <div className="pizza-image-container">
        <img className="pizza-image" src="./images/iteration-2-images/pictures/food-1.png" alt="Pizza" />
        
      </div>

      <form className="form" onSubmit={handleSubmit}>
        
        <h2 className="pizzaAdi">Position Absolute Acı Pizza</h2>
        <p className="price">85.50₺</p>
        <p className="description">Frontent Dev olarak hala position:absolute kullanıyorsan bu acı pizza tam sana göre.Pizza, domates, penir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşide bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzeta denir.</p>

  <fieldset className="ekMalzemeler">
  <legend className="boyut-sec">Boyut Seç <p style={{ color: "red", display: "inline" }}>*</p></legend>
  <div className="boyut-grup">
    {['S', 'M', 'L'].map((b) => (
      <label key={b} className={`boyut-button ${formData.boyut === b ? 'selected' : ''}`}>
        <input
          type="radio"
          name="boyut"
          value={b}
          checked={formData.boyut === b}
          onChange={handleChange}
          hidden
        />
        {b}
      </label>
    ))}
  </div>
  {errors.boyut && <p className="error">{errors.boyut}</p>}
</fieldset>


        <label className="label-hamur">
           <p className="hamursec">Hamur Seç *</p>
          <select className="select2" name="hamur" value={formData.hamur} onChange={handleChange}>
            <option value="">-Hamur Kalınlığı-</option>
            <option value="İnce">İnce</option>
            <option value="Normal">Normal</option>
            <option value="Kalın">Kalın</option>
          </select>
          {errors.hamur && <p className="error">{errors.hamur}</p>}
        </label>
<fieldset>
  <legend className="ekMalzeme">Ek Malzemeler</legend>
  <p>En az 4, en fazla 10 seçim. 5₺</p>
  <div className="grid">
    {malzemeListesi.map((m) => (
      <label key={m} className="malzeme-label">
        <input
          type="checkbox"
          value={m}
          checked={formData.malzemeler.includes(m)}
          onChange={handleChange}
        />
        <span className="custom-checkbox"></span>
        <span className="malzeme-etiket">{m}</span>
      </label>
    ))}
  </div>
  {errors.malzemeler && <p className="error">{errors.malzemeler}</p>}
</fieldset>


        <label>
          <p className="siparis">Sipariş Notu</p>
          <textarea className="siparis-notu"
          background-color="#FAF7F2"
            name="özel"
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            value={formData.özel}
            onChange={handleChange}
            
          />
        </label>
        <label>
  <p className="siparis">Ad Soyad</p>
  <input
  className="siparis-notu"
    type="text"
    name="isim"
    placeholder="Adınızı giriniz"
    value={formData.isim}
    onChange={handleChange}
  />
</label>

        <div className="adet-fiyat">
          <div className="adet">
            <button type="button" onClick={() => handleAdet("-")}>-</button>
            <span>{formData.adet}</span>
            <button type="button" onClick={() => handleAdet("+")}>+</button>
          </div>

          <div className="fiyat-box">
            <p className="toplamYazı">Sipariş toplamı</p>
            <p>Seçimler: {ekstraFiyat.toFixed(2)}₺</p>
            <strong className="toplam">Toplam: {(toplamFiyat * formData.adet).toFixed(2)}₺</strong>
             <button type="submit" className="submit-btn" disabled={submitting || !formData.boyut || !formData.hamur || formData.malzemeler.length < 4 }>
          SİPARİŞ VER
        </button>
          </div>
        </div>

       
      </form>

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

export default SiparisFormu;

