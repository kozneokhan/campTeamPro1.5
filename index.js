// 사이트이름
const title = document.querySelector('.title');

// 검색창(input)
const value = document.getElementById('result');

// 검색아이콘
const search = document.getElementById('searchIcon');

// 무비 카드의 부모
const movies = document.querySelector('.movies');

// 이름순 정렬 버튼
const sortByTitle = document.querySelector('.sortByTitle');

// 인기순 정렬 버튼
const sortByPopul = document.querySelector('.sortByPopul');

// 사이트이름 클릭 시 새로고침
title.addEventListener('click', () => {
  location.reload();
});

// 사이트 들어왔을 때 검색창에 포커스
value.focus();

// 영화 제목순 정렬 함수
const sortTitle = (a, b) => {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  if (a.title === b.title) return 0;
};

// 영화 인기순 정렬 함수
const sortpopularity = (a, b) => {
  return b.popularity - a.popularity;
};

//영화 정보 로컬스토리지에서 불러오기
let postInfos = JSON.parse(localStorage.getItem('posts')) || [];
console.log(postInfos);
const newPostInfos = postInfos.filter((a) => a.movieId !== undefined);
console.log(newPostInfos);

const onlyInfo = newPostInfos.map((info) => {
  return { id: info.movieId, star: ToNumber(info.star) };
});

console.log(onlyInfo);

// startToNumber(onlyInfo.star);
function ToNumber(star) {
  if (star === '⭐') {
    return 1;
  } else if (star === '⭐⭐') {
    return 2;
  } else if (star === '⭐⭐⭐') {
    return 3;
  } else if (star === '⭐⭐⭐⭐') {
    return 4;
  } else if (star === '⭐⭐⭐⭐⭐') {
    return 5;
  } else {
    return 0;
  }
}
// 영화 맵 함수⭐ function mapMovie(){}
const mapMovies = (movie) => {
  const movieBox = document.createElement('div');
  // 평점들의 평균을 계산하기
  let matchingRatings = onlyInfo.filter((info) => info.id === movie.id.toString());
  console.log(matchingRatings);
  let averageRating = matchingRatings.reduce((sum, info) => sum + info.star, 0) / matchingRatings.length;

  // 평균 점수를 소수점 첫번째 자리까지 나타내고, 리뷰가 없는 경우 0점으로 표시
  averageRating = isNaN(averageRating) ? 0 : averageRating.toFixed(1);
  movieBox.className = 'movie';
  movieBox.innerHTML = `
    <div class="movieTitle">${movie.title} ⭐${averageRating}</div>
      <div class="movieInner">
        <div class="movieImg">
          <img
            src=https://image.tmdb.org/t/p/w500${movie.poster_path}
            alt=""
          />
        </div>
        <div class="movieContent">
          <div class="rating">Rating : ${movie.vote_average}</div>
          <div class="summary">${movie.overview}</div>
      </div>
    </div>
  `;

  // 영화 부모 박스에 카드들 하나씩 넣기
  movies.append(movieBox);

  // 클릭 시 상세 페이지로 이동
  movieBox.addEventListener('click', () => {
    window.location.href = `./movieDetail.html?id=${movie.id}`;
  });
};

// 검색어와 영화이름과 비교(대문자 ,소문자 상관x)
const filter = (movie1) => movie1.title.toUpperCase().includes(value.value.toUpperCase());

// API 가져오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODJmZGE4ZDMzZjM3ZjQzMTgyOTlkMWEwZjE4YjU0YiIsInN1YiI6IjY1MmZhZGMxY2FlZjJkMDExY2M3ODY1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wmHOY_iWlMlVfnWoFTBFlIgDDVv5qR8q3Il78PrgkEE',
  },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    // 모든 영화 표시
    console.log('원본배열' + response.results);
    response.results.map(mapMovies);
    console.log(response.results.map(mapMovies));

    // 이름순 정렬하기
    sortByTitle.addEventListener('click', () => {
      // 사용한 정렬 버튼 표시
      sortByPopul.classList.remove('selectSort');
      sortByTitle.classList.add('selectSort');

      // movies 비우고 다시 map하기
      movies.innerHTML = '';
      response.results.sort(sortTitle).filter(filter).map(mapMovies);
    });

    // 인기순 정렬하기
    sortByPopul.addEventListener('click', () => {
      // 사용한 정렬 버튼 표시
      sortByTitle.classList.remove('selectSort');
      sortByPopul.classList.add('selectSort');

      // movies 비우고 다시 map하기
      movies.innerHTML = '';
      response.results.sort(sortpopularity).filter(filter).map(mapMovies);
    });
  });
