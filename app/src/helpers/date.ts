import firebase from 'firebase'

export const dateToTimestamp = firebase.firestore.Timestamp.fromDate
export { addDays, format as formatDate } from 'date-fns'
