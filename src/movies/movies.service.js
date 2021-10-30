const knex = require("../db/connection");

function list() {
  return knex("movies as m")
  .select("m.*")
  .join( "movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .where({ "mt.is_showing": true })
  .groupBy("m.movie_id")
}

function read(movieId) {
  return knex("movies").where("movie_id", movieId);
}

module.exports = {
  list,
  read,
};

