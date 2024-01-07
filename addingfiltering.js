router.get("/", async function(req, res, next) {
    try {
      const { name, minEmployees, maxEmployees } = req.query;
  
   
      if (minEmployees && maxEmployees && parseInt(minEmployees) > parseInt(maxEmployees)) {
        throw new BadRequestError("minEmployees cannot be greater than maxEmployees");
      }
  
    
      const companies = await Company.findAll(name, minEmployees, maxEmployees);
  
      return res.json({ companies });
    } catch (err) {
      return next(err);
        }})