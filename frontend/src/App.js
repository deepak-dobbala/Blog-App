import './App.css';
import Home from './components/home';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Authorprofile from './components/Authorprofile';
import Userprofile from './components/Userprofile';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "authorprofile", element: <Authorprofile />},
        { path: "userprofile", element: <Userprofile />}
      ]
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
