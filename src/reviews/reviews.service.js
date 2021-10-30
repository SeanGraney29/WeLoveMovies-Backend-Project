const knex = require("../db/connection");

async function readCritic(review) {
  return {
    ...review,
    critic: await knex("critics")
      .where({ critic_id: review.critic_id })
      .first()
  }
}

async function list(movie_id) {
  return knex("reviews")
    .where({ movie_id })
    .then((reviews) => Promise.all(reviews.map(readCritic)));
}

async function read(reviewId) {
  return knex("reviews")
  .where({ review_id: reviewId })
  .first();
}

async function update(review) {
  const reviewId = review.review_id;
  return knex("reviews")
    .where({ review_id: reviewId })
    .update(review)
    .then(() => read(reviewId))
    .then(readCritic);
}

async function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
  list,
  read,
  update,
  destroy,
};