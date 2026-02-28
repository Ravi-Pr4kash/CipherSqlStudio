function Question({ selectedAssignment }) {
  return (
    <div className="questionPanel">
      <h2>Question</h2>

      {selectedAssignment ? (
        <>
          <p>{selectedAssignment.question}</p>

          <h3>Sample Tables</h3>

          {selectedAssignment.sampleTables.map((table) => (
            <div key={table.tableName}>
              <h4>{table.tableName}</h4>

              <table border="1">
                <thead>
                  <tr>
                    {table.columns.map((col) => (
                      <th key={col.columnName}>
                        {col.columnName} ({col.dataType})
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {table.rows.map((row, index) => (
                    <tr key={index}>
                      {table.columns.map((col) => (
                        <td key={col.columnName}>{row[col.columnName]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      ) : (
        <p>Select an assignment</p>
      )}
    </div>
  )
}

export default Question