const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list(req.query);
  res.json({ data });
}

async function read(req, res, next) {
  const { movieId } = req.params;
  const response = await service.read(movieId);
  (!response[0]) ?
   next({ status: 404, message: "Movie cannot be found." })
   : res.json({ data: response[0] });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
}