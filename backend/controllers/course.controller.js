import { error } from "console";
import Course from "../models/course.model.js";
import Module from "../models/module.model.js";
import Video from "../models/video.model.js";
import { resourceLimits } from "worker_threads";

export const addCourse = async (req, res) => {
  try {
    // Log the req.file to check if the file is being uploaded
    console.log(req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Generate the URL for the uploaded thumbnail
    const thumbnail_url = `${req.protocol}://${req.get("host")}/thumbnail/${
      req.file.filename
    }`;

    const course = new Course({
      courseTitle: req.body.courseTitle,
      courseDescription: req.body.courseDescription,
      courseDepartment: req.body.courseDepartment,
      thumbnail: thumbnail_url,
    });

    await course.save();
    res.json({ success: true, message: "Course added", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getallCourse = async (req, res) => {
  try {
    const allCourse = await Course.find();

    if (!allCourse || allCourse.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(allCourse);
  } catch (error) {
    console.log(error);
  }
};
//delete course

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Attempt to find and delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      deletedCourse,
    });
  } catch (error) {
    console.log("Error in deleteCourse controller:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error ,Error in delete Course section",
    });
  }
};

// viudeo controller

export const addVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const video_url = `${req.protocol}://${req.get("host")}/video/${
      req.file.filename
    }`;

    const video = new Video({
      videoTitle: req.body.videoTitle,
      videoDescription: req.body.videoDescription,
      videoLink: video_url,
      videoNo: req.body.videoNo,
    });

    await video.save();
    res.json({ success: true, message: "Video uploaded successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//get all video

export const allVideo = async (req, res) => {
  try {
    const allVideo = await Video.find();

    if (!allVideo || allVideo.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No courses found" });
    }

    res.json({ success: true, allVideo });
  } catch (error) {
    console.log(error);
  }
};

export const addModule = async (req, res) => {
  try {
    const { moduleName, course, video, moduleNo } = req.body;

    if (!moduleName || !course || !Array.isArray(video)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newModule = new Module({
      moduleName,
      course: course,
      video: video,
      moduleNo: moduleNo,
    });

    await newModule.save();

    res.status(200).json({
      message: "module added successfully",
      moduleName: newModule.moduleName,
      course: newModule.course,
      video: newModule.video,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in addModule Controller" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const {
      _id,
      courseTitle,
      courseDescription,
      courseDepartment,
      noOfModules,
    } = req.body;

    const update = {
      $set: {
        courseTitle,
        courseDescription,
        courseDepartment,
        noOfModules,
      },
    };

    if (req.file) {
      const thumbnail_url = `${req.protocol}://${req.get("host")}/thumbnail/${
        req.file.filename
      }`;
      update.$set.thumbnail = thumbnail_url;
    }

    const result = await Course.findByIdAndUpdate(_id, update);

    if (!result) {
      return res.status(404).json({ error: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated course successfully", result });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error in updateCourse Controller" });
  }
};

export const modulesByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const allModules = await Module.find({ course: courseId });
    if (allModules.length === 0) {
      return res.status(400).json({ error: "no modules found" });
    }

    return res
      .status(200)
      .json({ message: "succesfully fetched all modules", allModules });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "error in modulesByCourseId Controller" });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { _id } = req.params;
    const video = await Video.findById({ _id });
    if (!video) {
      return res.status(400).json({ error: "video not found" });
    }
    return res
      .status(200)
      .json({ message: "video fetched successfully", video });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "error in getVideoById Controller" });
  }
};
