const TeamMember = require("../../models/teamMember");

module.exports = router => {
  router.get("/team", (req, res) => {
    TeamMember.find({})
      .sort({ name: 1 })
      .exec((err, teamMembers) => {
        if (err) {
          res.status(500).json({
            message: "Error retrieving team members"
          });
        } else {
          res.status(200).json({ teamMembers });
        }
      });
  });

  router.post("/team", (req, res) => {
    let member = new TeamMember(req.body);

    member.save((err, member) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      res.status(200).json({ success: true, message: 'Successfully added a new team member!', member: member });
    });
  });
};
