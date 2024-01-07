const results = await db.query(

    `INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ($1, $2, $3, $4)
    RETURNING title, salary, equity, company_handle AS "companyHandle"`,
[title, salary, equity, company_handle]
);

return result.rows[0];

if (currentJob.rows.length === 0) {
    throw new ExpressError('Job not found', 404);
  }
  
  const { title, salary, equity } = { ...currentJob.rows[0], ...data };
  
  const result = await db.query(
    `UPDATE jobs
         SET title=$2,
             salary=$3,
             equity=$4
         WHERE id=$1
         RETURNING title, salary, equity, company_handle AS "companyHandle"`,
    [id, title, salary, equity]
  );
  
  return result.rows[0];