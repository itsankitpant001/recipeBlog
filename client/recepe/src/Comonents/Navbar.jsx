
import { useCookies } from 'react-cookie'
import {Link,useNavigate} from 'react-router-dom'
function Navbar() {
  let [cookie,setcookie]=useCookies(["access_token"])
  const navigate=useNavigate()

  const logout=()=>{
    setcookie('access_token','')
    window.localStorage.removeItem('userid')
    navigate('/auth')
  }
  return (
    <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/saved">Saved-Recipe</Link>
        <Link to="/create">Create-Recipe</Link>
        {!cookie.access_token ? (<Link to="/auth">Login/Register</Link>) : <button onClick={logout}>Logout</button>}
    </div>
  )
}

export default Navbar