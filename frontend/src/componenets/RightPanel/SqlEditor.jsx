import Editor from "@monaco-editor/react"

function SqlEditor({ query, setQuery, onRun, loading }) {
  return (
    <section className="editorPanel">
      <h2>SQL Editor</h2>

      <Editor
        // height="200px"
        defaultLanguage="sql"
        value={query}
        onChange={(value) => setQuery(value)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />

      <button onClick={onRun} disabled={loading}>
        {loading ? "Running..." : "Run Query"}
      </button>
    </section>
  )
}

export default SqlEditor