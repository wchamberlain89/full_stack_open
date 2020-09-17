const initialState = {}

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      console.log("setting filter")
      return action.data.filter
    default:
      return state
  }
}

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  data: { filter }
})

export default filterReducer