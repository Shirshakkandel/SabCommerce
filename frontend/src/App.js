import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header/index'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ButtomNavigation from '../src/Components/BottomNavigation'
import Register from './Pages/Authentication/Register'
import Login from './Pages/Authentication/Login'

export default function App() {
  return (
      <div className={`app  flex flex-col min-h-screen text-sm`}>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login}/>
      </Switch>
      <Footer />
      <ButtomNavigation/>
      </div>
   
  )
}
