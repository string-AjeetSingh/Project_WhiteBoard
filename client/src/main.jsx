import { StrictMode, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useEventTracker } from './hooks/eventTraker'
import { CommonContext } from './myLib/commonContext/myContext'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import "../src/style.css"
import "./main.css"

import { Rough } from './components/rough/rough';
import { Home } from './pages/Home'
import { Menu } from './components/menu/menu'
import { NavBar } from './components/navBar/navBar'

function Dashboard({ }) {
  return (
    <>
      <h1> From Dashboard, we are good to meet</h1>
      <h1>I am addition to any child content i'll see in future</h1>

      <Outlet />

    </>

  );
}

function CommonHome({ }) {
  const [trackEvent, eventDetail] = useEventTracker();
  const aCommunication = useRef({});
  return (
    <>
      <CommonContext.Provider value={{ trackEvent, eventDetail, aCommunication }}>

        <header>
          <NavBar />
        </header>

        <hr className="border relative dark:border-lightPanle border-darkPanle z-[5]" />

        <Outlet />

      </CommonContext.Provider>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<CommonHome />}>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='' element={<h1>I am hero </h1>}></Route>
        </Route>
        <Route path='' element={<><h1>provide child addresh , like /home, /rough, /dashboard</h1></>}></Route>
        <Route path='/rough' element={<Rough />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<h1>From /dashboard</h1>}></Route>
          <Route path='profile' element={<h1>From dashboard/profile</h1>}></Route>
        </Route>
        <Route path='/concert' >
          <Route index element={<h1>From Consert</h1>}></Route>
          <Route path='trending' element={<h1>From the Concert/trending </h1>}></Route>
          <Route path=':city' element={<h1>From consert:city</h1>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
