module.exports = (db) => {
  const locationDelete = (location_id) => {
    const query = {
      text: `DELETE FROM attractions
      WHERE id = $1 RETURNING *`,
      values: [location_id],
    };
    return db
      .query(query) 
      .then((result) => console.log("RESULT.ROWS: ",result.rows[0]))
      .catch((err) => console.log(err));
  };
  return { locationDelete };
}