import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import BookingForm from './components/BookingForm'
import InfoSection from './components/Infosection'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Header />      
      <InfoSection />
      <BookingForm />
      <Footer />

    </div>
        
  )
}

export default App
