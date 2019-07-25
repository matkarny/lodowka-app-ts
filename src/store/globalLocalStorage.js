export const loadState = () => {
  const initialState = {
    notes: [],
    products: [],
    users: [
      { name: 'Rodzic', pin: '1234', id: 0, role: 0 },
      { name: 'Dziecko', pin: '4321', id: 1, role: 1 }
    ],
    auth: [-1]
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

