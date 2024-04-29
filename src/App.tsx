import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChartMaps from './components/ChartMaps';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="w-full h-screen">
      <Router>
        <div className='flex w-full h-full'>
          <div className='w-[15%] '>
            <Sidebar />
          </div>
          <div className='w-[85%] bg-slate-400 '>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/chartmaps' element={<ChartMaps />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
