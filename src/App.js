import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
function App() {
  const {currentUser}= useContext(AuthContext)
  console.log(currentUser);
  const ProtectRoute = ({children})=>{
    if(!currentUser){
     return <Navigate to='/login'/>
    }
    return (
      <>
      {children}
      </>
    )
  }
  return (
   
     <BrowserRouter>
     <Routes>
        <Route path='/'>
          <Route index element={<ProtectRoute>
            <Home/>
          </ProtectRoute>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='register' element={<Register/>}></Route>
        </Route>
     </Routes>
     </BrowserRouter>
     
  );
}

export default App;
