export const loadState = () => {
  const initialState = {
    notes: [
      {
        date: '20/10/2019',
        message: 'Fajna apka',
        author: 'user'
      }
    ],
    products: [
      {
        name: 'MLEKO',
        expirationDate: { year: 2019, month: 6, day: 21 },
        addedBy: 'USER',
        tagPosition: { left: 550, top: 550 },
        id: 0,
        shownPopup: true
      }
    ]
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
