var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

    
  models.Project
    .find({"_id": projectID}) // query for the specific project and
    .exec(afterQuery);   // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project({
    "title": form_data['project_title'],
    "date": form_data['date'],
    "summary": form_data['summary'],
    "image": form_data['image_url']}); // make a new Project 
  
  newProject.save(afterSaving); //and save it to the DB

  // YOU MUST send an OK response w/ res.send();
  function afterSaving(err) {
    if(err) { console.log(err); res.send(500);}
    res.send(200);
  }
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
    models.Project
      .find({"_id": projectID})// find the project and 
      .remove() //remove it
      .exec(afterRemoving);

  // YOU MUST send an OK response w/ res.send();
  function afterRemoving(err){
    if(err){console.log(err); res.send(500);}
    res.send(200);
  }
}