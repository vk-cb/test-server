const Course = require("../models/coursesSchema");

exports.createCourse = async(req,res)=>{
    const {title, description,price, instructorId} = req.body;
    try {
        const newCourse = {title, description, price, instructorId}
        await Course.create(newCourse);
        res.status(200).json({msg : "Course created successfully",data:newCourse});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}