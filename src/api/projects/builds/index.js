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
  if (found) {
    res.status(201).json(store.getState());
  } else {
    res.status(418).json({ message: "Unable to post build" });
  }
});

router.get("/latest", (req, res) => {
  const { projectId } = req.params;
  let found = false;
  let result;
  store.getState().forEach((project) => {
    if (project.id === projectId) {
      found = true;
      result = project.build[project.build.length - 1];
    }
  });
  if (found) {
    res.status(200).json(result);
  } else {
    res.status(418).json({ message: "No Builds" });
  }
});

router.get("/:buildId", (req, res) => {
  const { projectId, buildId } = req.params;
  let found = false;
  let result;
  store.getState().forEach((project) => {
    if (project.id === projectId) {
      if (project.build.length > 0) {
        project.build.forEach((build) => {
          if (build.buildNumber === Number(buildId)) {
            found = true;
            result = build;
          }
        });
      }
    }
  });
  if (found) {
    res.status(200).json(result);
  } else {
    res.status(418).json({ message: "No Matching Build" });
  }
});

module.exports = router;
