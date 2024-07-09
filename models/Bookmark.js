const mongoose =require('mongoose');

const BookMarkSchema  = new mongoose.Schema({
    location:{type: String, required: true},
    location:{type: String, required: true},
    title:{type: String, required: true},
    description:{type: String, required: true},
    agentName:{type: String, required: true},
    salary:{type: String, required: true}, 
    period:{type: String, required: true},
    contract:{type: String, required: true},
    hiring:{type: Boolean, required: true , default:true},
    requirements:{
        type: Array,
        required: true},
    imageUrl:{type: String, required: true},
    agentId:{type: String, required: true},
},{timestamps: true});
module.exports = mongoose.model('Bookmark', BookMarkSchema)