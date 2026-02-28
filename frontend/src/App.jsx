import { useEffect, useState } from "react"
import { fetchAssignments, executeQuery } from "./services/assignment.js"
import Sidebar from './componenets/LeftPanel/Sidebar.jsx'
import Question from './componenets/RightPanel/Question.jsx'
import SqlEditor from './componenets/RightPanel/SqlEditor.jsx'
import Result from './componenets/RightPanel/Result.jsx'

function App() {
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [query, setQuery] = useState("start your query here")
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await fetchAssignments()
        setAssignments(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadAssignments()
  }, [])

  const handleRun = async () => {
    if (!selectedAssignment) return
    try {
      setLoading(true)
      setError(null)
      const data = await executeQuery(
  query,
  selectedAssignment.sampleTables,
  selectedAssignment.expectedOutput
)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.error || "Query failed")
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
     <div className="app">
    <Sidebar
      assignments={assignments}
      selectedAssignment={selectedAssignment}
      onSelect={setSelectedAssignment}
    />
    <main className="rightPanel">
      <div className="rightPanelTop">
        <Question selectedAssignment={selectedAssignment} />
        <SqlEditor query={query} setQuery={setQuery} onRun={handleRun} loading={loading} />
      </div>
      <div className="resultWrapper">
        <Result results={results} error={error} />
      </div>
    </main>
  </div>
  )
}

export default App