
import{  BrowserRouter as Router, Route,  Routes } from 'react-router-dom'
import React from 'react'
import NotePage from './pages/NotePage'
import NoteListPage from './pages/NoteListPage'
import Header from './components/Header'
import './App.css';

function App() {
 
    
  return(
    <Router>
       <div className='container dark'>
         <div className='app'>
          <Header />
       
       <Routes>
   
          <Route path="/" element={<NoteListPage />}  />
          <Route path ="/note/:id" element={<NotePage /> }  />
       </Routes>
  </div>
  </div>
  

   </Router>
   
  )
  

}

export default App;
