import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Login'


function Body() {
    const appRouter= createBrowserRouter([{
        path:"/",
        element:<Login/>
    }])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
