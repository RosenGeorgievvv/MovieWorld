import './App.css'
import Footer from './components/Footer'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {

  return (
    <>
    <div>
      <Navbar />
    </div>
    <Movies />
    <div>
      <Footer />
    </div>
    </>
  )
}

export default App
