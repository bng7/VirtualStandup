const Standup = require("../../models/standup");
const mongoose = require("mongoose");

module.exports = router => {
  // GET stand up notes
  router.get("/standup", (req, res) => {
    Standup.find({})
      .sort({ createdOn: -1 })
      .exec((err, notes) => {
        if (err) {
          res.status(500).json({
            message: "Error finding standup documents"
          });
        } else {
          res.status(200).json({ notes });
        }
      });
  });

  //GET stand up notes based on team member name
  router.get("/standup/:teamMemberName", (req, res) => {
    const query = {
      teamMember: req.params.teamMemberName
    };

    console.log(req.params.teamMemberName);

    Standup.find(query)
      .sort({ createdOn: 1 })
      .exec((err, notes) => {
        if (err) {
          res.status(500).json({
            message: "Error retrieving team member notes"
          });
        } else {
          res.status(200).json({ notes });
        }
      });
  });

  //POST: create new standup note document
  router.post("/standup", (req, res) => {
    let note = new Standup(req.body);

    note.save((err, note) => {
      if (err) {
        return res.status(400).json({ success: false, message: 'Failed to add note!', error: err });
      }
      res.status(200).json({
        success: true,
        message: 'New stand up note has been added!',
        note: note
      });
    });
  });
};
