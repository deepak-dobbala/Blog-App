import './App.css';
import Home from './components/home';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // ⬅️ Your layout with header/footer
      children: [
        { index: true, element: <Home /> }, // path: "" (i.e., "/")
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> }
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
