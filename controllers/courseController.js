exports.createCourse = async(req,res)=>{
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}