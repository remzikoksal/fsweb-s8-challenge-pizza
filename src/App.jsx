import { useState } from 'react'
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './sayfalar/anaSayfa.jsx'; 
import SiparisFormu from './sayfalar/siparişSayfasi.jsx';
import SiparisOnay from './sayfalar/siparişOnayiSayfasi.jsx';

function App() {
 
  return (
  <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/siparis" component={SiparisFormu} />
        <Route path="/onay" component={SiparisOnay} />
      </Switch>
    </Router>
  );
}

export default App
