import { useState } from 'react'
import './App.css'
import Banlist from './components/Banlist.jsx'
import Discover  from './components/Discover.jsx'

function App() {
  const [banList, setBanList] = useState([]);

  const addToBanList = (attribute) => {
    setBanList(prev => [...prev, attribute]);
  }

  return (
    <>
      <div className="dog-box">
        <h1>🐶 Dog Viewer</h1>
        <h3>Take a look at some dogs!</h3>
        <Discover banList={banList} addToBanList={addToBanList}/>
      </div>
      <Banlist banList={banList} />
    </>
  )
}

export default App
