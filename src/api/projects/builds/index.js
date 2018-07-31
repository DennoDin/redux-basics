const router = require("express").Router({ mergeParams: true });
const { store, addBuild } = require("../../../redux");

router.get("/", (req, res) => {
  const { projectId } = req.params;
  let found = false;
  let result;
  store.getState().forEach((projectObj) => {
    if (projectObj.id === projectId) {
      found = true;
      result = projectObj.build;
    }
  });
  if (found) {
    res.status(200).json(result);
  } else {
    // TODO Get and return all builds of given project
    res.status(418).json(store.getState());
  }
});

router.post("/", (req, res) => {
  const { projectId } = req.params;
  const build = req.body;
  let found = false;
  store.getState().forEach((projectObj) => {
    if (projectObj.id === projectId) {
      found = true;
      store.dispatch(addBuild(projectId, build));
    }
  });
  // TODO Trigger a new build for a project. Return immediately with status 200 (don't wait for build to finish).
  if (found) {
    res.status(201).json(store.getState());
  } else {
    res.status(418).json({ message: "Not Implemented" });
  }
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  // TODO Retrieve the latest build of a project
  res.status(418).json({ message: "Not Implemented" });
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  // TODO Retrieve a single build from a project
  res.status(418).json({ message: "Not Implemented" });
});

module.exports = router;
