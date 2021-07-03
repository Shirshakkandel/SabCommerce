import { Switch, Route } from 'react-router-dom'
import Header from './Components/Header/index'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import ButtomNavigation from '../src/Components/BottomNavigation'
import Register from './Pages/Authentication/Register'
import Login from './Pages/Authentication/Login'
import ProductScreen from './Pages/product/ProductScreen'
import CartPage from './Pages/Cart/CartPage'
import ShippingScreen from './Pages/Checkout/ShippingScreen'
import SelectPayment from './Pages/Checkout/SelectPayment'
import OrderScreen from './Pages/Order/OrderScreen'
import Container from './Components/Container'

export default function App() {
  return (
    <div className={`app  flex flex-col min-h-screen text-sm`}>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} exact />
        <Route path="/page/:pageNumber" component={Home} exact />
        <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={CartPage} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={SelectPayment} />
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
        </Container>
      </Switch>
      <Footer />
      <ButtomNavigation />
    </div>
  )
}
