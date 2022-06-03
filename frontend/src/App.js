import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import LandingPage from './Components/LandingPage/LandingPage';
import MyNotes from './Components/MyNotes/MyNotes';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import RegisterScreen from './Components/RegisterScreen/RegisterScreen';
import CreateNote from './Components/CreateNote/CreateNote';
import SingleNote from './Components/SingleNote/SingleNote';
import Profile from './Components/Profile/Profile';

function App() {
  return (
      <BrowserRouter>
      <Header />
          <Routes>
            <Route path='/' element={<LandingPage />} exact />
            <Route path='/mynotes' element={<MyNotes />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/createnote' element={<CreateNote />} />
            <Route path='/note/:id' element={<SingleNote />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
