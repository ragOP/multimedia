import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.scss';


import Fifth_SP from './pages/5_sp';
import Apple from './pages/Apple'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* c */}
     
        
         <Route path="spandeb1" element={<Apple />} />
  

     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
