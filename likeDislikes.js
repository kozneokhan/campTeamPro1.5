document.addEventListener('DOMContentLoaded', function () {
  // 페이지가 로드될 때 좋아요 및 싫어요 정보 업데이트
  updateLikeDislikeUIOnLoad();

  // 좋아요 버튼에 대한 이벤트 리스너 추가
  const likeBtns = document.querySelectorAll('.likeBtn');

  for (const likeBtn of likeBtns) {
    likeBtn.addEventListener('click', (e) => {
      const commentId = likeBtn.getAttribute('data-comment-id');
      const comment = getCommentFromLocalStorage(commentId); // 댓글 정보 가져오기
      toggleLikeDislike(commentId, 'like', comment); // 좋아요 토글
    });
  }

  // 싫어요 버튼에 대한 이벤트 리스너 추가
  const dislikeBtns = document.querySelectorAll('.dislikeBtn');
  dislikeBtns.forEach((dislikeBtn) => {
    dislikeBtn.addEventListener('click', (e) => {
      const commentId = dislikeBtn.getAttribute('data-comment-id');
      toggleLikeDislike(commentId, 'dislike');
    });
  });
});

// 로컬 스토리지에서 댓글 정보 가져오기
function getCommentFromLocalStorage(commentId) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  return posts[commentId - 1];
}

// 로컬 스토리지에서 댓글 정보 업데이트
function updateCommentInLocalStorage(commentId, comment) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts[commentId - 1] = comment;
  localStorage.setItem('posts', JSON.stringify(posts));
}

// 페이지가 로드될 때 좋아요 및 싫어요 정보를 가져와 화면에 표시
function updateLikeDislikeUIOnLoad() {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (post.movieId === movieId) {
      updateLikeDislikeUI(i + 1, post.likes || 0, post.dislikes || 0);
    }
  }
}

function toggleLikeDislike(commentId, action, comment) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  if (!comment.likes) comment.likes = 0;
  if (!comment.dislikes) comment.dislikes = 0;

  if (action === 'like') {
    if (!comment.liked) {
      comment.likes++;
      comment.liked = true;
    } else {
      comment.likes--;
      comment.liked = false;
    }
  } else if (action === 'dislike') {
    if (!comment.disliked) {
      comment.dislikes++;
      comment.disliked = true;
    } else {
      comment.dislikes--;
      comment.disliked = false;
    }

    // 로컬 스토리지에 업데이트된 댓글 저장
    updateCommentInLocalStorage(commentId, comment);

    // 화면 업데이트
    updateLikeDislikeUI(commentId, comment.likes, comment.dislikes); // 화면 업데이트
  }
}

// 화면 업데이트
function updateLikeDislikeUI(commentId, likes, dislikes) {
  // 좋아요와 싫어요 버튼 업데이트
  const likeBtn = document.querySelector(`#likeBtn_${commentId}`);
  const dislikeBtn = document.querySelector(`#dislikeBtn_${commentId}`);

  if (likeBtn && dislikeBtn) {
    likeBtn.textContent = `좋아요 (${likes})`;
    dislikeBtn.textContent = `싫어요 (${dislikes})`;
  }
}
