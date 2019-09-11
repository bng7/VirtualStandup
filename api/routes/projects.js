const Project = require("../../models/project");

module.exports = router => {
  router.get("/projects", (req, res) => {
    const query = {
      isActive: { $eq: true }
    };

    Project.find(query)
      .sort({ name: 1 })
      .exec((err, projects) => {
        if (err) {
          res.status(500).json({
            message: "Error retrieving active projects"
          });
        } else {
          res.status(200).json({ projects });
        }
      });
  });

  router.post("/projects", (req, res) => {
    let project = new Project(req.body);

    project.save((err, project) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      res.status(200).json({ success: true, message: 'Successfully added a new project!', project: project });
    });
  });
};
