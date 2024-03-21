import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Developers from './Pages/Developers/Developers';
import AddDev from './Pages/Developers/Add/AddDev';
import DevEdit from './Pages/Developers/Edit/DevEdit';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Developers/>}/>
        <Route path='/add' element={<AddDev/>}/>
        <Route path='/edit/:id' element={<DevEdit/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
