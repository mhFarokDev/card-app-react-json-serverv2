import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Developers from './Pages/Developers/Developers';
import AddDev from './Pages/Developers/Add/AddDev';
import DevEdit from './Pages/Developers/Edit/DevEdit';
import Home from './Pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/developers' element={<Developers/>}/>
        <Route path='/add' element={<AddDev/>}/>
        <Route path='/edit/:id' element={<DevEdit/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
