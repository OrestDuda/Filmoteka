const APIkey = 'cd745b1c38819d91d823e4d3c6c216e8';
export default {
  movieID: 1,
  reviewsPage: 1,
  async fetchMovieModalData(movieID){
    try{
      const responseModal = await fetch(
        `https://api.themoviedb.org/3/movie/${this.movieID}?api_key=${APIkey}&language=en-US`,
      );
      const movieDetail = responseModal.json();
      return movieDetail;

    }catch (error){
      throw error;
    }
  },
  async fetchMovieModalVideo(movieID){
    try{
      const responseModalVideo = await fetch(
        `https://api.themoviedb.org/3/movie/${this.movieID}/videos?api_key=${APIkey}&language=en-US`,
      );
      const movieVideos = responseModalVideo.json();
      return movieVideos;

    }catch (error){
      throw error;
    }
  },
  async fetchMovieModalReviews(movieID, reviewsPage){
    try{
      const responseModalReviews = await fetch(
        `https://api.themoviedb.org/3/movie/${this.movieID}/reviews?api_key=${APIkey}&language=en-US&page=${this.reviewsPage}`,
      );
      const movieReviews = responseModalReviews.json();
      return movieReviews;

    }catch (error){
      throw error;
    }
  },


};
