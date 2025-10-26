import React from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {Navbar} from './components/Navbar'
import {Pastes} from './components/Pastes'
import {ViewPastes} from './components/ViewPastes'
import { Home } from './components/Home'
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navbar/>
      <Home/>
    </div>,
  },

   {
    path: "/pastes",
    element: <div>
      <Navbar/>
      <Pastes/>
    </div>,
  },

   {
    path: "/pastes/:id",
    element: <div>
      <Navbar/>
     <ViewPastes/>
    </div>,
  },
]);

const App = () => {
  return (
    <div>
        <RouterProvider router={router} />
<Toaster
  position="top-center"
  reverseOrder={false}
/>
</div>
  )
}

export default App
