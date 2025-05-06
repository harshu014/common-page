import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Menu from '../src/customer-menu'
// import FoodModal from '../src/addModal';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/foodmodal" element={<FoodModal />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App