import 'typeface-poppins';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Toss from './pages/Toss';
import Play from './pages/Play';
import Matches from './pages/Matches';
import SingleMatch from './components/SingleMatch';
import MatchDetails from './pages/MatchDetails';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toss' element={<Toss />} />
          <Route path='/play/:id' element={<Play />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/matches/:id' element={<MatchDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
