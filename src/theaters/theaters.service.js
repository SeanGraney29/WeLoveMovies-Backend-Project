const knex = require("../db/connection");

function list() {
  return knex("theaters")
    .select("*");
}

function readMovies(theater) {
  return knex("theaters as t")
    .join( "movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .where("t.theater_id", theater.theater_id);
}

module.exports = {
  list,
  readMovies,
};