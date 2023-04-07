import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
const NotesItem = (props) => {
  const {note,updateNote} = props;
  const context = useContext(noteContext)
  const {deleteNote} = context
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <div>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
