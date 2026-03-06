import React from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Dog from './components/Dog.jsx'

const App = () => {
  return (
    <>
    <Canvas>
      <Dog />
      </Canvas>
    </>
  )
}

export default App