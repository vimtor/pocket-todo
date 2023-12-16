/* eslint-disable import/order */
import { functions } from 'helpers'

const firestore = require('@google-cloud/firestore')

const ADMIN_CLIENT = new firestore.v1.FirestoreAdminClient()
const BUCKET_URI = 'gs://pocket-todo-backups'

exports.scheduledBackup = functions
  .region('europe-west3')
  .pubsub.schedule('every week')
  .onRun(() => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT
    const databaseName = ADMIN_CLIENT.databasePath(projectId, '(default)')

    return ADMIN_CLIENT.exportDocuments({
      name: databaseName,
      outputUriPrefix: BUCKET_URI,
      collectionIds: [],
    })
      .then((responses: { name: string }[]) => {
        const response = responses[0]
        // eslint-disable-next-line no-console
        console.log(`Operation Name: ${response.name}`)
      })
      .catch((error: string) => {
        // eslint-disable-next-line no-console
        console.error(error)
        throw new Error('Export operation failed')
      })
  })
