import { useState } from 'react'
import './App.css'
import Banlist from './components/Banlist.jsx'
import Discover  from './components/Discover.jsx'
import ViewedHistory from './components/ViewedHistory.jsx'

function App() {
  const [banList, setBanList] = useState([]);
  const [viewedHistory, setViewedHistory] = useState([]);

  const addToBanList = (attribute) => {
    setBanList(prev => [...prev, attribute]);
  }

  const removeFromBanList = (attribute) => {
    setBanList(prev => prev.filter(item => item !== attribute));
  }

  const addToHistory = (dog) => {
    setViewedHistory(prev => [dog, ...prev]);
  }

  return (
    <>
      <div className="dog-box">
        <h1>🐶 Dog Viewer</h1>
        <h3>Take a look at some dogs!</h3>
        <Discover banList={banList} addToBanList={addToBanList} addToHistory={addToHistory} />
      </div>
      <Banlist banList={banList} removeFromBanList={removeFromBanList}/>
      <ViewedHistory history={viewedHistory} />
    </>
  )
}

export default App
