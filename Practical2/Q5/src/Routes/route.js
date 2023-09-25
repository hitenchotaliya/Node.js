const router = require('express').Router();
const StudentController = require('../Controller/student.controller');
const uploadfile  = require('../Middleware/uploadfile');

router.post('/registerstud',uploadfile.upload, StudentController.RegisterStudent );
router.post('/login', StudentController.Studentlogin);
router.get('/logout', StudentController.StudentLogout);
router.get('/viewStudent', StudentController.getalldata);
router.get('/viewStudent/:id', StudentController.ViewOneStudent);
router.post('/updateStudent/:id',uploadfile.upload, StudentController.updatedata);
router.get('/deleteStudent/:id', StudentController.deleteStudent);




router.get("/", (req, res) => {
    res.render("login.hbs");
});



module.exports = router;