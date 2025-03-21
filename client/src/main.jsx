import { StrictMode, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useEventTracker } from './hooks/eventTraker'
import { CommonContext } from './myLib/commonContext/myContext'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import "../src/style.css"
import "./main.css"
import { Auth0Provider } from '@auth0/auth0-react';

import { Rough } from './components/rough/rough';
import { Workspace } from './pages/Workspace'
import { Menu } from './components/menu/menu'
import { Home } from './pages/Home'
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

        <Auth0Provider
          domain="dev-2jpux8rtke6h2fat.us.auth0.com"
          clientId="Vb7m57CFoHPF0MbpNLeC5cnkEuchEo8B"
          authorizationParams={{
            redirect_uri: window.location.origin + '/menu'
          }}
        >
          <header>
            <NavBar />
          </header>

          <hr className="border relative dark:border-lightPanle border-darkPanle z-[5]" />


          <Outlet />
        </Auth0Provider>

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
          <Route path='/workSpace' element={<Workspace />}></Route>
          <Route path='' element={<Home />}></Route>
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
