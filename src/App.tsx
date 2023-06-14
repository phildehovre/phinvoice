import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import New from './components/New'
import InvoiceForm from './components/InvoiceForm'
import EntityForm from './components/EntityForm'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/new" element={<New />} >
            <Route path="/new/invoice" element={<InvoiceForm />} />
            <Route path="/new/entity" element={<EntityForm />} />
          </Route >
      </Routes>
    </Router>
  )
}

export default App
