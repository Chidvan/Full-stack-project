import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ExpenseContextProvider } from './context/ExpensesContext'; // Make sure the path is correct!

function App() {
  return (
    <ExpenseContextProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className='pages'>
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ExpenseContextProvider>
  );
}

export default App;
