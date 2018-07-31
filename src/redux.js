const redux = require("redux");

const initial = [];

const createProject = (project) => ({
  type: "CREATE_PROJECT",
  project,
});

const patchProject = (projectId, project) => ({
  type: "PATCH_PROJECT",
  project,
  projectId,
});

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
  }
  return state;
};

const store = redux.createStore(reducer);

module.exports = {
  store,
  createProject,
  patchProject,
};
