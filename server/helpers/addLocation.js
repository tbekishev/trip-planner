module.exports = (db) => {
  const addLocation = (user_id, locationName, cityName, rate, photo_url, plan_date) => {
    const attractionQuery = {
      text: `INSERT INTO attractions (user_id, name, city, rate, photo_url, plan_date) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
      values: [user_id, locationName, cityName, rate, photo_url, plan_date],
    };
    return db
      .query(attractionQuery) 
      .then((result) => console.log(result.rows[0]))
      .catch((err) => console.log(err));
  };
  return { addLocation };
}