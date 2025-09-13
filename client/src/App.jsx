import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Body from './components/Body'
import  { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
      <div>
        <Body/>
        <Toaster/>
      </div>
    </>
  )
}

export default App
