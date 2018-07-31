const router = require("express").Router();
const builds = require("./builds");
const { store, createProject, patchProject } = require("../../redux");

router.get("/", (req, res) => {
  res.status(200).json(store.getState());
});

router.put("/", (req, res) => {
  const project = req.body;
  store.dispatch(createProject(project));
  res.status(201).json(store.getState());
});

router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  store.getState().forEach((object) => {
    if (object.id === projectId) {
      res.status(201).json(object);
    } else {
      res.status(418).json({
        message: "Not Implemented",
      });
    }
  });
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = req.body;
  store.getState().forEach((object) => {
    if (object.id === projectId) {
      store.dispatch(patchProject(projectId, project));
      res.status(201).json(store.getState());
    } else {
      res.status(418).json({
        message: "No ID match",
      });
    }
  });
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  // TODO delete project, return status 200 with no body on success
  res.status(418).json({
    message: "Not Implemented",
  });
});

router.use("/:projectId/builds", builds);

module.exports = router;
