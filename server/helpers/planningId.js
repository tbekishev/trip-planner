module.exports = (db) => {
  const planningId = (id) => {
    const query = {
      text: `
      SELECT *
      FROM plans
      ORDER BY id DESC
      LIMIT 1;
      `,
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return { planningId };
}
  