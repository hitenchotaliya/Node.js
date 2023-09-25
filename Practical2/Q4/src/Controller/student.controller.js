const Student = require("../model/Student");


exports.Studentlogin = async (req, res) => {
  try {
      const password = req.body.password;
      const email = req.body.email;
      console.log(email);
      console.log(password);

      const data = await Student.findOne({ email: email });
      console.log(data);
      if(data)
      {
        if (data.password === password && data.email === email) {
          if (!data.tokens[0]) {
              const token = await data.generateauthToken();
              res.cookie("jwt", token, {
                  expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
              })

              res.status(201).redirect("/viewStudent");
          } else {
              res.status(400).json({
                  message: "already token",
                  status: 400,
              })
          }
      }
      else {
          res.status(400).json({
              message: "Enter valid username or password",
              status: 400,
          })
      }
      }
      else{
        res.status(400).json({
          message: "Enter valid username or password",
          status: 400,
      })
      }
    

  } catch (error) {
    console.log(error);
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
      
      res.status(200).json({ message: 'Student registered successfully',
    data:data });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while registering the student' });
    }
  };


  exports.StudentLogout = async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token

        })
        res.clearCookie("jwt");
        await req.user.save();
        res.redirect("/");

    } catch (error) {
      res.redirect("/");

    }
}

exports.ViewOneStudent = async (req, res) => {
  try {
      const _id = req.params.id;
      const data = await Student.findById(_id);
      res.render("updateStudent", { records: data})
     
    //   res.status(200).json({
    //       message: "record Found successfully",
    //       data:data
    //   })

  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: "did not Find"
      })
  }
}

exports.updatedata = async (req, res) => {
  try {
      const _id = req.params.id;
      const data = await Student.findByIdAndUpdate(_id, req.body, {
          new: true
      });
     
      res.status(201).redirect("/viewStudent");

  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: "did not update"
      })
  }
}

exports.getalldata = async (req, res) => {
  try {
      const showdata = await Student.find()
     
      res.render("AllStudent", { records: showdata});
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
     res.redirect("/viewStudent");


  } catch (error) {
      console.log(error);
      res.status(400).json({
          message: "did not deleted"
      })
  }
}  