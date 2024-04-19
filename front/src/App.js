import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import ActivityBoard from './components/activityBoard/ActivityBoard';
import { useState } from 'react';

function App() {

  const [currentPage, setCurrentPage] = useState('Activité')

  return (
    <div className="App">
      <Header currentPage={currentPage}></Header>
      <ActivityBoard></ActivityBoard>
    </div>
  );
}

export default App;
