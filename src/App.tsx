import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Home } from './Pages/Home';
import { Search } from './Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen overflow-y-auto">
        <div className="h-full flex flex-col">

          <Header />

          <main className="w-full flex justify-center h-full bg-gradient-to-b from-[#2a3540] to-[#252525] p-3 lg:p-4">
            <div className="w-full w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </div>
          </main>

          <Footer />

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
