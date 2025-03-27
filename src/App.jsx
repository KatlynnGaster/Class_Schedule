import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ViewSchedulePage from './ViewSchedulePage';
import ClassList from './APITest';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* for bootstrap*/}
      <ViewSchedulePage />
      <ClassList />

    </>
  )
}

export default App
