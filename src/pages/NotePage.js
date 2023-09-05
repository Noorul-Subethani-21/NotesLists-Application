import React,{useEffect, useState} from 'react'
    import {useMatch,useNavigate } from 'react-router-dom'
    import { Link, } from 'react-router-dom'
//import notes from '../assets/data'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left-solid.svg'
  const NotePage =({ histroy})  => {
    const match =useMatch('/note/:id')
    const navigate = useNavigate('/localhost:3000')
    let noteId =match.params.id
   // let note = notes.find(note=>note.id === Number(noteId))
 let [note, setNote] =useState(null)
 useEffect(() =>{
   getNote()
 },[noteId])

 let getNote=async() =>{
  if (noteId === 'new') return
  let response = await fetch(`http://localhost:8000/notes/${noteId}`)
  let data = await response.json()
  setNote(data)
}



let createNote =async() =>{
  console.log('create note')
  await fetch(`http://localhost:8000/notes/`,{

    method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({...note, 'updated':new Date()})
  })
  navigate('/')

}
   


    let updateNote =async() =>{
      console.log('update')
      await fetch(`http://localhost:8000/notes/${noteId}`,{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify({...note, 'updated':new Date()})
      })

    }


    let deleteNote =async ()=>{
      console.log('delete/')
      await fetch(`http://localhost:8000/notes/${noteId}`,{
        method:'DELETE',
        headers:{
          'Content-Type' : 'application/json'
        },
        body:JSON.stringify(note)
       } )
      navigate('/')
      
    }

    let handleSumbit =()=>{
      if(noteId !== 'new' && !note.body){
        deleteNote()
      }else if(noteId !== 'new'){
        updateNote()
      }else if(noteId === 'new' && note !== null){
           createNote()
      }
     
      navigate('/')

    }

  
      return (
        <div className='note'>
          <div className='note-header'>
            <h3>
              <Link to='/'>
                  <ArrowLeft onClick={handleSumbit} />
              </Link>
            </h3>
            {noteId !== 'new' ? (
               <button onClick={deleteNote} >Delete</button>   
            ):(
              <button onClick={createNote} >Done</button>   
            )}
                
          </div>
          <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}>

          </textarea>
          </div>
      )
    }
    
    export default NotePage;

    


    
   