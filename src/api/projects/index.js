const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  createProject,
  patchProject,
  deleteProject,
} = require("../../redux");

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
  let found = false;
  let result;
  store.getState().forEach((object) => {
    if (object.id === projectId) {
      found = true;
      result = object;
    }
  });
  if (found) {
    res.status(201).json(result);
  } else {
    res.status(418).json({
      message: "ID not found",
    });
  }
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = req.body;
  let found = false;
  store.getState().forEach((object) => {
    if (object.id === projectId) {
      found = true;
      store.dispatch(patchProject(projectId, project));
    }
  });
  if (found) {
    res.status(201).json(store.getState());
  } else {
    res.status(418).json({
      message: "No ID match",
    });
  }
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  let found = false;
  store.getState().forEach((object) => {
    if (object.id === projectId) {
      found = true;
      store.dispatch(deleteProject(projectId));
    }
  });
  if (found) {
    res.status(200).json(store.getState());
  } else {
    res.status(418).json({
      message: "No Id Match",
    });
  }
});

router.use("/:projectId/builds", builds);

module.exports = router;
