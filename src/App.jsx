import { useState, useEffect } from 'react'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import {
  BrowserRouter as Router ,
  Route ,
  Link ,
  Outlet ,
  Routes ,
  createBrowserRouter ,
  createRoutesFromElements ,
  RouterProvider 
 } from 'react-router-dom'

//npm react-webcam

export default function App() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<Root />} >
          <Route index element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
          <Route path='/page3' element={<Page3 />} />  
        </Route>
      )
    )

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
const Root = () => {
  return(
    <>
      <div className='appjsx'>
        <Link to='/'>Page1</Link>
        <Link to='/page2'>Page2</Link>
        <Link to='/page3'>Page3</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

