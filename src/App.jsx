import { useState } from 'react'
import CardList from './components/CardList'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [currentCards, setCurrentCards] = useState([])
  return (
    <>
      <CardList />
    </>
  )
}

export default App
