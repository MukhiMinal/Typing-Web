
import './App.css';


import { GlobalStyles } from './Styles/global';

import { ThemeProvider } from 'styled-components';
import {useTheme} from './Context/ThemeContext'
import UserPage from './Pages/UserPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';

function App() {
  const {theme}=useTheme();
  return (
    //use router in thiis
    <ThemeProvider theme={theme}>
      <ToastContainer/>
 
      <GlobalStyles/>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/user' element={<UserPage/>} />
   </Routes>
    </ThemeProvider>
  
  );
}

export default App;
