import { createSlice } from '@reduxjs/toolkit'

let notificationTimeoutId

const notificationSlice = createSlice({
  initialState: '',
  name: 'notification',
  reducers: {
    createNotification: (_, action) => {
      return action.payload
    },
  },
})

export const setNotification =
  (notification, durationInSeconds = 5) =>
  async (dispatch) => {
    dispatch(notificationSlice.actions.createNotification(notification))
    if (notificationTimeoutId) {
      clearTimeout(notificationTimeoutId)
    }
    notificationTimeoutId = setTimeout(() => {
      dispatch(notificationSlice.actions.createNotification(''))
    }, durationInSeconds * 1000)
  }

export default notificationSlice.reducer
