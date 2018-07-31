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
          // Object.assign(project.build, action.build)
          project.build.push(action.build);
        }
      });
      return storeClone;
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
};
