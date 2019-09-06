const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let IssuesSchema = new Schema({

  issueId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },

  issueTitle: {
    type: String,
    default: '',
  },
  
  reporterName: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    default: 'Backlog',
  },

  description: {
    type: String,
    default: 'Description not available'
  },

 productImage:{
   type:String
 },
  assignee:{
    type:String,
    default:''
  },
  comments:[],
  watchers:[],

  createdOn :{
    type:Date,
    default: new Date()
  }

})


mongoose.model('IssueModel', IssuesSchema);