export  function CustomerAdd (objData) {
    return {
      type: 'Add',
      payload: objData
      }
}

export  function CustomerList () {
    return {
      type: 'List',
      }
}