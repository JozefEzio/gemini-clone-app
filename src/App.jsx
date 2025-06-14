import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/Main/Main'


function App() {
  const [recentInputFromSideBar, setRecentInputFromSideBar] = useState('');
  const [isNewChat, setIsNewChat] = useState(false);
  return (
    <>
      <Sidebar setRecentInputFromSideBar={setRecentInputFromSideBar}
        setIsNewChat={setIsNewChat} />
      <Main recentInputFromSideBar={recentInputFromSideBar}
        isNewChat={isNewChat} />
    </>
  )
}

export default App