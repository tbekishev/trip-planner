module.exports = (db) => {
  const addPlanning = (user_id, name, start_date, end_date, starting_time, ending_time, group_size) => {
    const query = {
      text: ` INSERT INTO plans (user_id, name, start_date, end_date, starting_time, ending_time, group_size)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      values: [user_id, name, start_date, end_date, starting_time, ending_time, group_size],
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  // const addVisits = (plan_id, attrction_id) => {
  //   const query = {
  //     text: ` INSERT INTO visits (plan_id, attrction_id)
  //     VALUES ($1, $2)
  //     RETURNING *`,
  //     values: [plan_id, attrction_id],
  //   };
  //   return db
  //     .query(query)
  //     .then((result) => result.rows[0])
  //     .catch((err) => err);
  // };

  return { addPlanning };
}
  