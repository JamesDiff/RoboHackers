// Import and export all components from the components folder

import AllProducts from './allproducts';
import { Login, Logout } from './login';
import Register from './register';
import Title from './title';
import NavBar from './NavBar';

export { default as App } from './App';
export { default as SingleProductView } from './SingleProductView';

export { AllProducts,
        Login,
        Logout,
        Register,
        Title,
        NavBar,
}
