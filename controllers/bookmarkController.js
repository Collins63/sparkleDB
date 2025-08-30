const Bookmark = require("../models/Bookmark");
const Job = require("../models/Job");

module.exports = {
    createBookmark: async (req, res) => {
        const jobID = req.body.job;
        try {
            const job = await Job.findById(jobID);
            if(!job){
                return res.status(400).json({error: "Job Not Found"});
            }
            console.log('job found');
            const newBook = new Bookmark({job: job , userId: req.body.userId});
            const savedBookmark = await newBook.save();
            const {_v, updatedAt , ...newBookmarkInfo} = savedBookmark._doc;
            res.status(200).json(newBookmarkInfo)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteController: async (req, res) => {

        try {
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("BookMark Successfully Deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getBoomarks: async(req, res) =>{
        try {
            const bookmarks = await Bookmark.find({userId: req.params.userId});
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}