const redux = require("redux");

const initial = [];

/////////////////////
// PROJECT ACTIONS //
/////////////////////

const createProject = (project) => ({
  type: "CREATE_PROJECT",
  project,
});

const patchProject = (projectId, project) => ({
  type: "PATCH_PROJECT",
  project,
  projectId,
});

const deleteProject = (projectId) => ({
  type: "DELETE_PROJECT",
  projectId,
});

/////////////////////
/// BUILD ACTIONS ///
/////////////////////

const addBuild = (projectId, build) => ({
  type: "ADD_BUILD",
  projectId,
  build,
});

const runBuild = (projectId, buildNumber) => ({
  type: "RUN_BUILD",
  projectId,
  buildNumber,
});

const endBuild = (projectId, buildNumber, buildStatus, output) => ({
  type: "FINISH_BUILD",
  projectId,
  buildNumber,
  buildStatus,
  output,
});

/////////////////////
///    REDUCER    ///
/////////////////////

const reducer = (state = initial, action) => {
  switch (action.type) {
    case "CREATE_PROJECT": {
      const clone = [...state, action.project];
      return clone;
    }
    case "PATCH_PROJECT": {
      const clone = [...state];
      clone.forEach((object) => {
        if (object.id === action.projectId)
          Object.assign(object, action.project);
      });
      return clone;
    }
    case "DELETE_PROJECT": {
      const clone = [];
      state.forEach((object) => {
        if (object.id !== action.projectId) {
          clone.push(object);
        }
      });
      return clone;
    }

    case "ADD_BUILD": {
      const storeClone = [...state];
      storeClone.forEach((project) => {
        if (project.id === action.projectId) {
          project.build.push(action.build);
        }
      });
      return storeClone;
    }
    case "RUN_BUILD": {
      const clone = [...state];
      clone.forEach((project) => {
        if (project.id === action.projectId) {
          project.build.forEach((build) => {
            if (build.buildNumber === action.buildNumber) {
              build.status = "running";
            }
          });
        }
      });
      return clone;
    }
    case "FINISH_BUILD": {
      const clone = [...state];
      clone.forEach((project) => {
        if (project.id === action.projectId) {
          project.build.forEach((build) => {
            if (build.buildNumber === action.buildNumber) {
              build.status = action.buildStatus;
              build.output = action.output;
            }
          });
        }
      });
      return clone;
    }
  }
  return state;
};

const store = redux.createStore(reducer);

module.exports = {
  store,
  createProject,
  patchProject,
  deleteProject,
  addBuild,
  runBuild,
  endBuild,
};
