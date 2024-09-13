import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import SavedRecipe from './pages/SavedRecipe'
import CreateRecipe from './pages/Create-Recipe'
import Navbar from './Comonents/Navbar'

function App() {
 

  return (
   <>
   <div className='App'>
   <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/auth' element={<Auth/>}/>
    <Route path='/saved' element={<SavedRecipe/>}/>
    <Route path='/create' element={<CreateRecipe/>}/>
    </Routes>
   </Router>
   </div>
   </>
  )
}

export default App
