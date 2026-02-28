import { pool } from "../config/pg.js"

export const runQuery = async (req, res) => {
  const client = await pool.connect()

  try {
    const { query, sampleTables } = req.body

    console.log(sampleTables)

    if (!query || !sampleTables) {
      return res.status(400).json({ msg: "query and sampleTables required" })
    }

    await client.query("BEGIN")

    for (let i = 0; i < sampleTables.length; i++) {
      await client.query(`DROP TABLE IF EXISTS ${sampleTables[i].tableName}`)
    }

    for (let i = 0; i < sampleTables.length; i++) {
      const table = sampleTables[i]

      let columnParts = ""
      for (let j = 0; j < table.columns.length; j++) {
        const col = table.columns[j]
        columnParts += `${col.columnName} ${mapType(col.dataType)}`
        if (j < table.columns.length - 1) columnParts += ", "
      }

      await client.query(`CREATE TABLE ${table.tableName} (${columnParts})`)


      for (let j = 0; j < table.rows.length; j++) {
        const row = table.rows[j]
        const keys = Object.keys(row)
        const values = Object.values(row)

        let placeholders = ""
        for (let k = 0; k < keys.length; k++) {
          placeholders += `$${k + 1}`
          if (k < keys.length - 1) placeholders += ", "
        }

        let keyList = ""
        for (let k = 0; k < keys.length; k++) {
          keyList += keys[k]
          if (k < keys.length - 1) keyList += ", "
        }

        await client.query(
          `INSERT INTO ${table.tableName} (${keyList}) VALUES (${placeholders})`,
          values
        )
      }
    }

    const result = await client.query(query)

    let isCorrect = null

    if (req.body.expectedOutput?.type === "table") {
      const expected = req.body.expectedOutput.value

      isCorrect =
        JSON.stringify(normalize(result.rows)) ===
        JSON.stringify(normalize(expected))

      console.log("RESULT:", normalize(result.rows))
      console.log("EXPECTED:", normalize(expected))
    }

    await client.query("ROLLBACK")

    return res.status(200).json({
      rows: result.rows,
      isCorrect
    })

  } catch (error) {
    await client.query("ROLLBACK")
    return res.status(400).json({ error: error.message })
  } finally {
    client.release()
  }
}

function mapType(type) {
  const typeMap = {
    INTEGER: "INTEGER",
    TEXT: "TEXT",
    VARCHAR: "VARCHAR(255)",
    REAL: "REAL"
  }

  return typeMap[type] || "TEXT"
}

function normalize(rows) {
  const result = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const sortedKeys = Object.keys(row).sort()
    const newRow = {}

    for (let j = 0; j < sortedKeys.length; j++) {
      const key = sortedKeys[j]
      const num = Number(row[key])
      newRow[key] = Number.isNaN(num) ? row[key] : num
    }

    result.push(newRow)
  }

  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - 1 - i; j++) {
      const a = JSON.stringify(result[j])
      const b = JSON.stringify(result[j + 1])
      if (a.localeCompare(b) > 0) {
        const temp = result[j]
        result[j] = result[j + 1]
        result[j + 1] = temp
      }
    }
  }

  return result
}