var multer = require('multer');
const jwt = require("jsonwebtoken");
const userData = require("../model/Student");
// set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

exports.upload = multer({
    storage: storage,
    limits: { fileSize: 6000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" ) {
            cb(null, true);
        } else {
            cb(null, true);
            return cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
        }
    }
}).array('Images', 5); 


//verify Token
exports.verifyToken = async (req, res, next) => {
    try {
        
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.TOKEN_KEY);

        
        const adminUser = await userData.findOne({ _id: verifyToken._id });

        req.token = token;
        req.adminUser = adminUser;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).render("login")
    }
};