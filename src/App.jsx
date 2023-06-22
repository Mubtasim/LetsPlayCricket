import 'typeface-poppins';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Toss from './pages/Toss';
import Play from './pages/Play';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toss' element={<Toss />} />
          <Route path='/play/:id' element={<Play />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
