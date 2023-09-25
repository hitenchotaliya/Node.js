const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
     email: {
        type: String,
        unique:true,
        
        
    },
    password: {
        type: String,
        
    },
    confpassword: {
        type: String,
        
    },
    address: {
        type: String
    },
    phone: {
        type: Number,
        
    },
    Images: [{
         ImageUrl: {
            type: String
         }
    }],
    tokens: [
        {
            token: {
                required: true,
                type: String
            }
        }

    ]

});

studentSchema.methods.generateauthToken = async function () {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id:this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("Students", studentSchema);