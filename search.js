fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko-US&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    // 엔터누를 때 마다 검색
    value.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        moviesearch();
      }
    });

    // search 아이콘 누를 때 마다 검색
    search.addEventListener('click', () => {
      moviesearch();
    });

    // 검색결과 필터링 함수
    function moviesearch() {
      if (value.value == '') {
        // 검색어가 비어있을 시
        alert('검색어를 입력해주세요');
      }

      // 일치하는 검색어가 없을 시, 있다면 필터링
      if (response.results.filter(filter).length == 0) {
        // 일치하는 검색어가 없을 시
        alert('일치하는 검색어가 없습니다');
      } else {
        // map 사용전에 부모 박스 비우기
        movies.innerHTML = '';

        // 필터링된 영화만 map으로 표시
        response.results.filter(filter).map(mapMovies);
      }
    }
  });
