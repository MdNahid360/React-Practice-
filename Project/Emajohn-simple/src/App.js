import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header/Header';
import Order from './components/Order/Order';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop';

function App() {
  const nahid = (d)=>{
    console.log(d);
  }
  return (
    <div className="App">
        <Header></Header>
          <Routes>
              <Route path="/" element={<Shop></Shop>}></Route>
              <Route path="/order" element={<Order></Order>}></Route>
              <Route path="/review" element={<Review></Review>}></Route>
          </Routes>
    </div>
  );
}

export default App;
