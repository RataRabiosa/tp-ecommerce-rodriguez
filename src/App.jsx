import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
function App() {

  return (
    <>
    <nav>
      <NavBar />
    </nav>
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    </>
  )
}

export default App
