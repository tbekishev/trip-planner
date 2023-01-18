module.exports = (db) => {
  const planningId = () => {
    const query = {
      text: `
      SELECT *
      FROM plans
      WHERE id = 2;
      `
      // values: [user_id, name, start_date, end_date, starting_time, ending_time, group_size],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return { planningId };
}
  