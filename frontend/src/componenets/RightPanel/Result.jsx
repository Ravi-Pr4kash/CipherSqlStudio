function Result({ results, error }) {
  return (
    <div className="resultPanel">
      <h2>Results</h2>

      {error && <p className="errorResult">{error}</p>}

      {results && results.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(results[0]).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {results?.isCorrect === true && (
        <p className="correctResult">Congo. query is correct</p>
      )}

      {results?.isCorrect === false && (
        <p className="wrongResult">try again</p>
      )}

      {results && results.length === 0 && <p>No rows returned</p>}
    </div>
  )
}

export default Result