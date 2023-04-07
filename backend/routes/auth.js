const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhamissmartboy";
var fetchUsers = require('../middleware/fetchuser')

//ROUTE 1: Create user without login
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json("Sorry this emailId already exists");
    }
    try {
      var salt = await bcrypt.genSaltSync(10);
      var securedPassword = await bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData);
      res.json({ jwtToken: jwtData,success:true });
    } catch (error) {
      res.json({ error: "Something went wrong. ", message: error.message,success:false });
    }
  }
);




//ROUTE 2: Authenticate the user using POST /api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ message: "Login Successful",jwtToken:jwtData });
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);


//ROUTE 3 : Get logged in user Details using POST /api/auth/getuser - Login Credentials
router.get(
  "/getuser",fetchUsers,  async (req, res) => {
    

    try {
      userid = req.user.id
      const user = await User.findById(userid).select("-password")
      res.status(200).send({user})
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error" });
    }
  }
);



module.exports = router;


