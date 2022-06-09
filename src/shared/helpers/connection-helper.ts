import { database } from './database-connection-helper'

export const connection = () => database.initialize().catch(error => console.error(error))