export const loadState = () => {
  const initialState = {
    notes: [],
<<<<<<< HEAD
    products: [],
    users: {
      id: 0,
      usersList: [],
    },
    loggedUser: null,
=======
    products: []
>>>>>>> 79331cbaefb6c229ff4d9c16c52d0afa8c8dd3ad
  };

  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return initialState;
    else return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};