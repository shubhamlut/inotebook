const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//ROUTE 1: Get all notes for a user GET: /getusernotes
router.get("/getusernotes", fetchUsers, async (req, res) => {
  try {
    userid = req.user.id;
    const notes = await Notes.find({ user: req.user.id });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
});

//ROUTE 2: Create note POST: /createnote

router.post(
  "/createnote",
  fetchUsers,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      userid = req.user.id;
      const notes = await Notes.create({
        user: userid,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      res.status(200).send(notes);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);

//ROUTE 3: Update the note using PUT: /updatenote/:id  Login Required

router.put("/updatenote/:id", fetchUsers, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //Find the note to update it

    let  note = await Notes.findById(req.params.id)
    if(!note){
      res.status(404).send("Not found")
    }
console.log(note)
    if(note.user.toString() !== req.user.id)
    {res.status(401).send("Not Allowed")
  
  }

  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

  res.json({note});
   
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
});


//ROUTE 4: Delete the note PUT: /deletenote/:id - Login required

router.delete("/deletenote/:id", fetchUsers, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    

    //Find the note to update it

    let  note = await Notes.findById(req.params.id)
    if(!note){
      res.status(404).send("Not found")
    }
console.log(note)
    if(note.user.toString() !== req.user.id)
    {res.status(401).send("Not Allowed")
  
  }

  note = await Notes.findByIdAndDelete(req.params.id,{new:true})

  res.json({Message:"Note Deleted"});
   
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
