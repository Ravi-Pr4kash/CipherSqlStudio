import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const fetchAssignments = async () => {
  const response = await axios.get(`${API_URL}/api/v1/assignments`)
  return response.data.assignments
}

export const executeQuery = async (query, sampleTables, expectedOutput) => {
  const response = await axios.post(`${API_URL}/api/v1/run`,
    { query, sampleTables, expectedOutput }
  )
  return response.data
}