export function CustomerAdd(objData) {
  return {
    type: "Add",
    payload: objData,
  };
}
export function CustomerUpdate(objData) {
  return {
    type: "FinalUpdate",
    payload: objData,
  };
}

export function CustomerList() {
  return {
    type: "List",
  };
}
