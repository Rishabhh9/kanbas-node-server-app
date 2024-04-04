import db from "../Database/index.js";


export default function AssignmentRoutes(app) {
    // getting all the assignments
    app.get("/api/courses/:cid/assignments", (req, res) => {
      const { cid } = req.params;
      const assignments = db.assignments
        .filter((m) => m.course === cid);
      res.send(assignments);
    });

    // adding new assignments (Create)
  
    app.post("/api/courses/:cid/assignments", (req, res) => {
      const { cid } = req.params;
      const newAssignment = {
        ...req.body,
        course: cid,
        _id: new Date().getTime().toString(),
      };
      db.assignments.push(newAssignment);
      res.send(newAssignment);
    });
  
    // Deleting assignments (Delete)
    app.delete("/api/assignments/:aid", (req, res) => {
      const { aid } = req.params;
      db.assignments = db.assignments.filter((m) => m._id !== aid);
      res.sendStatus(200);
    });
  
    // Updating assignments
    app.put("/api/assignments/:aid", (req, res) => {
      const { aid } = req.params;
      const assignmentIndex = db.assignments.findIndex(
        (m) => m._id === aid);
      db.assignments[assignmentIndex] = {
        ...db.assignments[assignmentIndex],
        ...req.body
      };
      res.sendStatus(204);
    });

  }
  