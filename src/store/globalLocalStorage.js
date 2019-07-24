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
>>>>>>> 45f23c9be45931ccf91b9dc2d08f4e4b19ed1842
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 45f23c9be45931ccf91b9dc2d08f4e4b19ed1842
