import 'typeface-poppins';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Toss from './pages/Toss';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toss' element={<Toss />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
