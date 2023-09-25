const Student = require("../model/Student");


exports.Studentlogin = async (req, res) => {
  try {
      const password = req.body.password;
      const email = req.body.email;

      const data = await Student.findOne({ email: email });

      if (data.password === password && data.email === email) {
          if (!data.tokens[0]) {
              const token = await data.generateauthToken();
              res.cookie("jwt", token, {
                  expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
              })
             return   res.status(200).json({
              msg:"Successfully Login",
              status:200
             })
          } else {
              res.status(400).json({
                  message: "already token",
                  status: 400,
              })
          }
      }
      else {
          res.status(400).json({
              message: "page not found",
              status: 400,
          })
      }

  } catch (error) {
      res.status(400).json({
          message: "page not found",
          status: 400,
      })

  }
}
          

exports.RegisterStudent  = async (req, res) => {
    try {
      
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
      }
  
      const { name, email, password, confpassword, address, phone } = req.body;
  
      const images = req.files.map(file => {
        
        return {
          ImageUrl: file.filename
        };
      });
      
      const newStudent = new Student({
        name,
        email,
        password,
        confpassword,
        address,
        phone,      
        Images: images
      });
  
    const data =   await newStudent.save();
      console.log("🚀 ~ file: student.controller.js:70 ~ exports.RegisterStudent= ~ data:", data)
      
      res.status(201).json({ message: 'Student registered successfully',
      status :201,
    data:data });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while registering the student' });
    }
  };


  exports.StudentLogout = async (req, res) => {
    try {
       
        console.log("🚀 ~ file: student.controller.js:86 ~ exports.StudentLogout= ~ req.body:", req)
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token

        })
        res.clearCookie("jwt");
        await req.user.save();
        res.status(200).json({msg:"Deleted",
        status:200})

    } catch (error) {
      res.status(200).json({msg:"Deleted",
      status:200})

    }
}

exports.ViewOneStudent = async (req, res) => {
  try {
      const _id = req.params.id;
      const data = await Student.findById(_id);
      // res.render("updateStudent", { records: data})
     
      res.status(200).json({
          message: "record Found successfully",
          data:data
      })

  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: "did not Find"
      })
  }
}

exports.updatedata = async (req, res) => {
  try {
    const {  name, phone, email, address, Images } = req.body;
    console.log("🚀 ~ file: student.controller.js:125 ~ exports.updatedata= ~ _id:", req.params.id)
    const _id = req.params.id
   

    const updatedStudent = await Student.findByIdAndUpdate(_id, {
      name,
      phone,
      email,
      address,
      Images, // Assuming Images is an array of objects with an ImageUrl property
    }, {
      new: true, // This option returns the updated student object
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Handle the Images array as needed here, e.g., save images to the server or database

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getalldata = async (req, res) => {
  try {
      const showdata = await Student.find()
     res.status(200).json({
      data:showdata
     })
      // res.render("AllStudent", { records: showdata});
  } catch (error) {
      res.status(400).json({
          message: "can not display"
      })
  }
}

exports.deleteStudent = async (req, res) => {
  try {
      const _id = req.params.id;
      
      const data = await Student.findByIdAndDelete(_id, {
          new: true
      });
     res.status(200).json({msg:"Deleted",
    status:200})


  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: "did not deleted"
      })
  }
}  