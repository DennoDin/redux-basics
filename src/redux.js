const redux = require("redux");

const initial = [];

const createProject = (project) => ({
  type: "CREATE_PROJECT",
  project,
});

const reducer = (state = initial, action) => {
  switch (action.type) {
    case "CREATE_PROJECT": {
      const clone = [...state, action.project];
      console.log(action);
      return clone;
    }
  }
  return state;
};

const store = redux.createStore(reducer);

module.exports = {
  store,
  createProject,
};
