import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const host = "http://localhost:5000";

  //Fetch all notes
  const getNotes = async (authToken) => {
    const response = await fetch(`${host}/api/notes/getusernotes`, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          authToken,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // ADD Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxN2UxMGZhOGEzZTljNjc5NDYxMjM0In0sImlhdCI6MTY3OTI4NjU0M30.0lSkVe-b5KmYp_tEiQ63MJLE2NTHDEAGUJRNH_4LtOY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const addedNote = await response.json();
    // const newNotes = json.concat(addedNote);
    // setNotes(newNotes);
    getNotes();
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log("dfjkjdfkjk");
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxN2UxMGZhOGEzZTljNjc5NDYxMjM0In0sImlhdCI6MTY3OTI4NjU0M30.0lSkVe-b5KmYp_tEiQ63MJLE2NTHDEAGUJRNH_4LtOY",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    //Logic to edit in client

    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Delete Note

  const deleteNote = async (id) => {
    //API Logic
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxN2UxMGZhOGEzZTljNjc5NDYxMjM0In0sImlhdCI6MTY3OTI4NjU0M30.0lSkVe-b5KmYp_tEiQ63MJLE2NTHDEAGUJRNH_4LtOY",
      },
    });
    const json = await response.json();
    setNotes(json);
    console.log(json);
    //Logic to delete the note from front end
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // const s1 = {
  //     "name":"shubham",
  //     "firm":"Marsh Mclennan"
  //     }
  // const [state,setState] = useState(s1)
  // const update = ()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Shubham Lutade",
  //             "firm":"Deloitte"
  //     })
  //     },1000)
  // }

  return (
    <NoteContext.Provider
      value={{
        notes,
        editNote,
        addNote,
        deleteNote,
        getNotes,
        deleteNote,
        addNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
