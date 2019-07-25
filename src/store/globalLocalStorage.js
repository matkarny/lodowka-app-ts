export const loadState = () => {
  const initialState = {
    notes: [],
    products: [],
    users: [],
    auth: ['-1']
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
  } <<
  << << < HEAD
}; ===
=== =
};

>>>
>>> > ba8ba3c567d6f5e9b0a072f6ec754cdb29f66c90