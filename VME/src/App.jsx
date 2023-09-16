//import react 
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import "./App.scss"

//import components
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

//import pages
import Home from "./pages/home/Home"
import Events from "./pages/events/Events"
import Event from "./pages/event/Event"
import Categories from "./pages/categories/Categories"
import Category from "./pages/category/Category"
import Register from "./pages/register/Register"
import Profile from "./pages/profile/Profile"
import About from "./pages/about/About"
import Login from "./pages/login/Login"
import CreateEvent from './pages/createEvent/createEvent';
import CreateCat from './pages/createCat/CreateCat';
import Participate from './pages/participate/Participate';
import UserEvent from './pages/userEvent/UserEvent';
import Congratulation from './pages/congratulation/Congratulation';
import EventDetail from './pages/eventDetail/EventDetail';

function App() {

  const Layout = () => {
    return (
      <div className="layout">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path:"/",
          element: <Home />
        },
        {
          path:"/events",
          element: <Events />
        },
        {
          path:"/event/:eventId",
          element: <Event />
        },
        {
          path:"/participate/:evtId",
          element: <Participate />
        },
        {
          path:"/evtdetail/:evtId",
          element: <EventDetail />
        },
        {
          path:"/congrats/:evtId",
          element: <Congratulation />
        },
        {
          path:"/createevent",
          element: <CreateEvent />
        },
        {
          path:"/categories",
          element: <Categories />
        },
        {
          path:"/category/:catId",
          element: <Category />
        },
        {
          path:"/createcategory",
          element: <CreateCat />
        },
        {
          path:"/profile",
          element: <Profile />
        },
        {
          path:"/myevents",
          element: <UserEvent />
        },

        {
          path:"/aboutus",
          element: <About />
        }
      ]
    },
    {
      path:"/register",
      element: <Register />
    },
    {
      path:"/login",
      element: <Login />
    }
  ]);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  )
}

export default App
