import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

//import register page and others
import Register from "./pages/Register"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Single from './pages/Single';
import Write from "./pages/Write";

/*
//create a layout (navbar and footer)
const Layout =() =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  );
};*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
    {
      path:"/home",
      element:<Homepage/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },
     
  
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/",
    element: <Login/>,
  },

]);
 /*
    children: [
      {
      path:"/home",
      element:<Homepage/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]*/

function App() {
  return (
    <div className="app">
     <div className='container'>
      <RouterProvider router ={router}/>
     </div>
    </div>
  );
}




export default App;
