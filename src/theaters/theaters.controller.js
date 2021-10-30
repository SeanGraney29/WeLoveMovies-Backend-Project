const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const theaters = await service.list();
  const data = await Promise.all(theaters.map(async (theater) => {
    return { 
      ...theater,
       movies: await service.readMovies(theater) 
      };
  }));
   res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};