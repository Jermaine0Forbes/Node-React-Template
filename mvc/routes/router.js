const express = require('express');
const { param, body } = require('express-validator');
const router = express.Router();
const userCtr = require("../controllers/userController");
const loginCtr = require("../controllers/loginController");
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
      destination: path.resolve('public/upload'),
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
      }
});
const upload = multer({storage});


router.get("/users", userCtr.index);

router.route('/user/:id', )
      .get(param('id').isNumeric().trim(),userCtr.get)
      .put(userCtr.put)
      .delete(userCtr.delete)

router.post("/register",
      [
       body('email').isEmail().trim().escape().withMessage('Not a valid email address'), 
       body('username').notEmpty().trim().escape().withMessage('Not a valid username'),
       body('password').isLength({min:3}).notEmpty().trim().escape().withMessage('Not a valid password'),
      ] ,
       loginCtr.register);
       
router.post("/login",
      [
      body('email').isEmail().trim().escape().withMessage('Not a valid email address'), 
      body('password').isLength({min:3}).notEmpty().trim().escape().withMessage('Not a valid password'),
      ],
      loginCtr.login);

router.post("/upload/profile",upload.single('file'), userCtr.profImage);
module.exports = router;
