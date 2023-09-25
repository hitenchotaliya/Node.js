const router = require("express").Router()


 router.get("/", (req, res) => {
    res.render("Login.hbs")
  });
  
  const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  router.post("/login", (req, res) => {
    try {
        const password = req.body.password;
        
        req.session.userId = Date.now();
      
        return res.render("dashboard.hbs");
    } catch (error) {
        console.log(error);
    }
    
  

  });
  
  
  
  

  router.get("/logout", (req, res) => {
    // Destroy session and redirect to login page
    req.session.destroy();
    res.redirect("/");
  });

module.exports = router