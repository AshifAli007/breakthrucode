// import './App.css';
import {React, component} from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom';
import MainLayout from './containers/MainLayout/MainLayout'
function App() {
  return (
    <BrowserRouter>
      <MainLayout></MainLayout>
    </BrowserRouter>
  );
}

export default App;
