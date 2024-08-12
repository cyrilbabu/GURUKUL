import Course from "../models/course.model.js";
import Video from "../models/video.model.js";

export const addCourse = async (req, res) => {
    try {
        // Log the req.file to check if the file is being uploaded
        console.log(req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        // Generate the URL for the uploaded thumbnail
        const thumbnail_url = ${req.protocol}://${req.get('host')}/thumbnail/${req.file.filename};

        const course = new Course({
            courseTitle: req.body.courseTitle,
            courseDescription: req.body.courseDescription,
            courseDepartment: req.body.courseDepartment,
            thumbnail: thumbnail_url
        });

        await course.save();
        res.json({ success: true, message: "Course added", course });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}


export const getallCourse = async(req,res)=>{

    try{

    const allCourse = await Course.find();

   if (!allCourse || allCourse.length === 0) {
        return res.status(404).json({ success: false, message: "No courses found" });
    }
    res.status(200).json({ success: true, allCourse })
}catch(error){
    console.log(error)
}
}


// viudeo controller 





export const addVideo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

      
        const video_url = ${req.protocol}://${req.get('host')}/videos/${req.file.filename};

        const video = new Video({
            videoTitle: req.body.videoTitle,
            videoDescription: req.body.videoDescription,
            videoLink: video_url,
        });

        await video.save();
        res.json({ success: true, message: "Video uploaded successfully", video });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//get all video 


export const allVideo =async (req,res)=>{
    try{
    const allVideo = await Video.find();


    if (!allVideo || allVideo.length === 0) {
        return res.status(404).json({ success: false, message: "No courses found" });
    }

    res.json({success:true,allVideo})
    }
    catch(error){
        console.log(error)
    }
    
}