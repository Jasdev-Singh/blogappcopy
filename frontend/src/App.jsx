import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//import register page and others
import Register from "./pages/Register"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import Single from './pages/Single';
import Write from "./pages/Write";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/home",
    element: <Homepage/>,
  },
   {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      },

]);
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
