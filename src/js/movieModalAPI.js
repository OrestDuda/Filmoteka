import { apiKey, baseUrl } from './api';

export default {
  movieID: 1,
  reviewsPage: 1,
  async fetchMovieModalData(movieID) {
    try {
      const responseModal = await fetch(
        `${baseUrl}/3/movie/${this.movieID}?api_key=${apiKey}&language=en-US`,
      );
      return responseModal.json();
    } catch (error) {
      throw error;
    }
  },
  async fetchMovieModalVideo(movieID) {
    try {
      const responseModalVideo = await fetch(
        `${baseUrl}/3/movie/${this.movieID}/videos?api_key=${apiKey}&language=en-US`,
      );
      return responseModalVideo.json();
    } catch (error) {
      throw error;
    }
  },
  async fetchMovieModalReviews(movieID, reviewsPage) {
    try {
      const responseModalReviews = await fetch(
        `${baseUrl}/3/movie/${this.movieID}/reviews?api_key=${apiKey}&language=en-US&page=${this.reviewsPage}`,
      );
      return responseModalReviews.json();
    } catch (error) {
      throw error;
    }
  },
};
