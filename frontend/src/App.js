import './App.css';
import Home from './components/home';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Authorprofile from './components/Authorprofile';
import Userprofile from './components/Userprofile';
import Articlesbyauthor from './components/articlesbyauthor'
import Newarticle from './components/newarticle'
import Articlecomponent from './components/Articlecomponent';
import Articles from './components/articles';
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
        { path: "authorprofile", element: <Authorprofile />,children:[
          { path: "articlesbyauthor/:author", element: <Articlesbyauthor /> },
          { path: "article/:articleId", element: <Articlecomponent /> },
          { path: "newarticle", element: <Newarticle /> },
          {path :'',element:<Articlesbyauthor/>}
        ]},
        { path: "userprofile", element: <Userprofile />,children:[
          {path:'articles',element:<Articles/>},
          {path:'article/:articleId',element:<Articlecomponent/>},
          {path:'',element:<Articles/>}
        ]}
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
