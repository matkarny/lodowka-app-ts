
export const loadState = () => {
  const initialState = {
    notes: [],
    products: [{
      name: 'Przeterminowane mleko',
      tagPosition: { top: 160, left: 200 },
      addedBy: 'USER X',
      expirationDate: { year: 2019, month: 6, day: 25 },
      id: 25160200,
      shownPopup: false,
      vitalityColor: ''
    }],
    users: [],
    drawings: [],
    auth: ["-1"]
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