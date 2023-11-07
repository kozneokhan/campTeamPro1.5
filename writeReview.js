// URL에서 movieId 가져오기

console.log(movieId);

/* 작성 ----------------------------------------------------------*/
function writing() {
  console.log(movieId);

  let writer = f.writer.value.trim();
  let pwd = f.pwd.value.trim();
  let content = f.content.value;
  let star = f.star.value;
  let errorDiv = document.getElementById('error');

  // 작성자, 글 비밀번호, 내용, 별점선택 유효성검사
  if (writer.length < 2) {
    errorDiv.textContent = '작성자는 두 글자 이상 입력해주세요.';
    return;
  }
  if (pwd.length < 4) {
    errorDiv.textContent = '글 비밀번호는 네 자리 이상 입력해주세요.';
    return;
  }
  if (content.length < 2) {
    errorDiv.textContent = '내용은 두 글자 이상 입력해주세요.';
    return;
  }
  if (star === '별점선택') {
    errorDiv.textContent = '별점을 선택해주세요.';
    return;
  }
  // 오류 메시지 지우기
  errorDiv.textContent = '';

  // 현재 시간을 가져오기
  const timestamp = new Date(); // 현재 시간으로 설정

  // Rest of your code to create the review and save to local storage
  const newIdx = issueNewCommentIdx();
  let el = makeDiv(newIdx, writer, pwd, content, star, timestamp, 0, 0);
  let list = document.getElementById('list');
  list.appendChild(el);

  // 글 작성 완료되면 입력폼 초기화
  f.writer.value = '';
  f.pwd.value = '';
  f.content.value = '';
  f.star.value = '별점선택';

  // 글 작성이 완료된 후 글 내용을 로컬 스토리지에 저장
  saveToLocalStorage(writer, pwd, content, star, 0, 0);
}

/* 글<div> 생성 ----------------------------------------------------*/
function makeDiv(idx, writer, pwd, content, star, timestamp, likes, dislikes) {
  /*-- 1. <div id="d_1" pwd='1111'></div> ------------------------*/
  let newDiv = document.createElement('div'); // 새 <div> 태그 생성
  newDiv.id = `d_${idx}`; // 생성한 div에 id 지정. d_1, d_2 ...
  newDiv.pwd = pwd; // 사용자가 입력한 pwd값을 파라미터로 받아 할당.
  newDiv.classList.add('commentBox');

  const timeAgo = elapsedTime(timestamp); // 작성 시간을 계산

  /*-- 2. <div>태그의 innerHTML 값 넣어주기 --------------------------*/
  newDiv.innerHTML = `
  <div class="commentUserBox">
    <div class='commentUser'>
        <div id='s_${idx}'>${star}</div>
        <div class='comment' id='c_${idx}'>${content}</div>
        <div class='timeBox'>
          <div class='user' id='w_${idx}'>${writer}</div>
          <div>${timeAgo}</div>
          <div class= likeDis>
              <button class="likeBtn">
               <svg aria-label="좋아요" class="_8-yf5 white" display="none" ....></svg>
               <svg aria-label="좋아요 취소" class="_8-yf5 red" display="none" ...></svg>
               <span class="button-text">좋아요</span>
               <span class="like-count">${likes}</span>
              </button>
              <button class="dislikeBtn">
               <svg aria-label="싫어요" class="_8-yf5 white" display="none" ....></svg>
               <svg aria-label="싫어요 취소" class="_8-yf5 red" display="none" ...></svg>
               <span class="button-text">싫어요</span>
               <span class="dislike-count">${dislikes}</span>
               </button>
        </div>
      </div>
      <div class='buttonBox'>
        <div class='BtnStyle' onclick=editForm(${idx})>수정</div>
        <div class='BtnStyle' onclick=del(${idx})>삭제</div>
      </div>
  </div>
  `;

  return newDiv;
}

// '작성' 버튼에 클릭 이벤트 리스너를 추가합니다.
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', writing);
