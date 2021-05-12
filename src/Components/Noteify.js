import React, { useState,useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import { Button, TextField } from "@material-ui/core";
import { Delete, Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

function Noteify() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [notes, setNotes] = useState([]);
  const [posted, setPosted] = useState(false);
  
  

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };
  
  
    const handleDelete = (noteId,id) => {
      if(window.confirm('Are you sure yoy want to delete note?')){
        fetch('https://reminders-task.hiring.durbin.live/note/'+noteId, {
          method: 'DELETE'
        })
        .then(()=>{
          setNotes((prevNotes) => {
            return prevNotes.filter((item, index) => {
              return index !== id;
            });
          });            
                    
        })
        
      }
      
    };
  
 
  
  const postData=  (e)=>{
    e.preventDefault();
    axios.post('https://reminders-task.hiring.durbin.live/note',note)
    .then(response=>{
      console.log(response)
      setPosted(true);
    })
    .then(()=>{
       fetch('https://reminders-task.hiring.durbin.live/notes')
      .then(response => response.json())
      .then(data => {
                    setNotes(data.data.notes);
                   
                });
    })
    .catch(error=>{
      console.log(error)
    })
    setNote({
      title: "",
      description: "",
    });
     
  }
  return (
    <div>
      <header>
        <h1 className="header">Noteify</h1>
      </header>
      <div className="input">
        <form>
          <TextField
            className="textField"
            name="title"
            value={note.title}
            onChange={handleChange}
            color="secondary"
            label="Title"
            size="medium"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            name="description"
            value={note.description}
            onChange={handleChange}
            label="Enter description"
            rows="3"
            color="secondary"
            
            variant="outlined"
          />
          <br />
          <br />
          <Button
            color="primary"
            variant="contained"
            size="small"
            style={{ margin: "20px 40px", borderRadius:'15px' }}
            onClick={postData}
          >
            <Add/>
            <p>Add Note</p>
          </Button>
        </form>
      </div>
    
      {notes.map((item,id) => {
         
          
            return(
            <div  className="note">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{item.created_at}</p>
            <button onClick={() => handleDelete(item.id,id)}><Delete/></button>
          </div>);}
          
            
         
        
      )}
          
     
    </div>
  );
}

export default Noteify;
