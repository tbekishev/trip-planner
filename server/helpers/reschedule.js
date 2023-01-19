module.exports = (db) => {
  const reschedule = (location_id, new_date) => {
    console.log("BEFORE UPDATE: ", location_id, new_date)
    const query = {
      text: `UPDATE attractions SET plan_date = $1 WHERE id = $2 RETURNING *`,
      values: [new_date, location_id],
    };
    return db
      .query(query) 
      .then((result) => console.log("RESULT.ROWS: ",result.rows[0]))
      .catch((err) => console.log(err));
  };
  return { reschedule };
}