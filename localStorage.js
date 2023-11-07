/* 작성한 글을 로컬 스토리지에 저장 */
function saveToLocalStorage(writer, pwd, content, star, likes, dislike) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  let post = {
    writer,
    pwd,
    content,
    star,
    movieId: movieId, // 영화 ID 추가
    timestamp: new Date(),
    likes,
    dislike,
  };
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
}

/* 페이지 로드 시 로컬 스토리지에서 글을 불러와 목록에 표시 */
window.onload = function () {
  loadFromLocalStorage();
};

function loadFromLocalStorage() {
  let list = document.getElementById('list');
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    // 영화 ID에 따라 필터링
    if (post.movieId === movieId) {
      console.log('테스트', post);
      let el = makeDiv(i, post.writer, post.pwd, post.content, post.star, post.timestamp, post.likes, post.dislikes);
      list.appendChild(el);
    }
  }
}

function issueNewCommentIdx() {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  return posts.length;
}
