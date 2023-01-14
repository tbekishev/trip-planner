module.exports = (db) => {
  const addLocation = (name, start_date, end_date, user_id, location_id, locationName, cityName, rate, average_budget) => {
    const planQuery = {
      text: `INSERT INTO plans (name, start_date, end_date, user_id, location_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [name, start_date, end_date, user_id, location_id],
    };
    return db
      .query(planQuery)
      .then((result) => {
        const attractionQuery = {
          text: `INSERT INTO attractions (name, city, rate, average_budget) VALUES ($1, $2, $3, $4) RETURNING *`,
          values: [locationName, cityName, rate, average_budget],
        };
        return db.query(attractionQuery);
      })
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  return { addLocation };
}