// Import and export all components from the components folder

import AllProducts from './allproducts';
import { Login } from './login';
import Register from './register';
import Title from './title';
import NavBar from './NavBar';
import Cart from './Cart';

export { default as App } from './App';
export { default as SingleProductView } from './SingleProductView';

export { AllProducts,
        Login,
        Register,
        Title,
        NavBar,
        Cart,
}
