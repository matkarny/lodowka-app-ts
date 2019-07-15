export function loadLocalStorage() {
  try {
    const serializedState = localStorage.getItem('fridge');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
  }
}

export function saveLocalStorage(data) {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem('fridge', serializedState);
  } catch (e) {
    console.log(e);
  }
}
