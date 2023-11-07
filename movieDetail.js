// URL에서 movieId 가져오기
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
console.log(movieId);
// API에서 영화 데이터 가져오기
const options = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODJmZGE4ZDMzZjM3ZjQzMTgyOTlkMWEwZjE4YjU0YiIsInN1YiI6IjY1MmZhZGMxY2FlZjJkMDExY2M3ODY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wmHOY_iWlMlVfnWoFTBFlIgDDVv5qR8q3Il78PrgkEE',
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options)
  .then((response) => {
    return response.json();
  })
  .then((movie) => {
    console.log(movie);
    // 페이지에 영화 데이터 표시하기
    const movieTitle = document.querySelector('.movieTitle');
    const movieImage = document.querySelector('.movieImage');
    const movieGenres = document.querySelector('.movieGenres');
    const movieOriginalLanguage = document.querySelector('.movieOriginalLanguage');
    const movieReleaseDate = document.querySelector('.movieReleaseDate');
    const movieVoteCount = document.querySelector('.movieVoteCount');
    const movieRuntime = document.querySelector('.movieRuntime');
    const movieRating = document.querySelector('.movieRating');
    const movieOverview = document.querySelector('.movieOverview');

    movieTitle.textContent = movie.title;
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;
    movieGenres.textContent = `장르 : ${movie.genres.map((genre) => genre.name).join(', ')}`;
    movieOriginalLanguage.textContent = `언어 : ${movie.original_language}`;
    movieReleaseDate.textContent = `개봉일 : ${movie.release_date}`;
    movieVoteCount.textContent = `관객 : ${movie.vote_count}천명`;
    movieRuntime.textContent = `상영시간 : ${movie.runtime}분`;
    movieRating.textContent = `순위 : ${movie.vote_average}위`;
    movieOverview.textContent = movie.overview;

    // 영화 ID를 localStorage에 저장
    localStorage.setItem('movieId', movieId);
  })

  .catch((e) => console.log('오류났습니다! 아쉽네요'));

const title = document.querySelector('.title');
title.addEventListener('click', () => {
  window.location.href = 'index.html';
});
