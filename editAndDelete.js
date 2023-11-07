// 1-1. 수정 폼 보여주기 (이전에 작성한 내용과 함께)
function editForm(cnt) {
  let editDiv = document.getElementById('d_' + cnt); // 수정할 글의 div
  let editForm = document.getElementById('editf'); // 수정폼 div

  // 수정할 글(부모요소)에 수정폼(자식요소)을 추가하기
  editDiv.appendChild(editForm);

  // <span></span> 사잇값을 변수에 담기
  let writer = document.getElementById('w_' + cnt).innerHTML;
  let content = document.getElementById('c_' + cnt).innerHTML;
  let star = document.getElementById('s_' + cnt).innerHTML;

  // 수정폼에 사잇값 담기
  document.getElementById('editwriter').value = writer;
  document.getElementById('editcontent').value = content;
  document.getElementById('editstar').value = star;

  // 버튼에 cnt 속성을 추가해서 수정 글번호를 저장
  document.getElementById('editbtn').setAttribute('data-cnt', cnt);
  setTimeout(() => {
    editForm.classList.toggle('editf'); // 화면에 수정폼이 나타나게 하기
  }, 30);
}

/* 1-2. 수정 완료하기 -----------------------------------------------*/
function edit() {
  let cnt = document.getElementById('editbtn').getAttribute('data-cnt'); // 수정할 글의 번호
  let editDiv = document.getElementById('d_' + cnt); // 수정할 글의 div
  let pwd2 = document.getElementById('editpwd').value; // 수정폼에 입력한 글 비밀번호

  if (editDiv.pwd != pwd2) {
    // 원 글 비번과 수정폼 비번 비교
    alert('글 비밀번호 불일치. 수정 불가');
  } else {
    let newWriter = document.getElementById('editwriter').value;
    let newcontent = document.getElementById('editcontent').value;
    let newstar = document.getElementById('editstar').value;

    // 폼에 작성한 내용을 글 div에 담기
    document.getElementById('w_' + cnt).innerHTML = newWriter;
    document.getElementById('c_' + cnt).innerHTML = newcontent;
    document.getElementById('s_' + cnt).innerHTML = newstar;

    // 로컬 스토리지에서도 수정된 내용을 업데이트
    updateLocalStorage(cnt, newWriter, newcontent, newstar);
  }

  // 입력폼 초기화
  document.getElementById('editwriter').value = '';
  document.getElementById('editpwd').value = '';
  document.getElementById('editcontent').value = '';
  document.getElementById('editstar').value = '별점선택'; // 초기값으로 설정

  // 폼 숨기기
  cancel();
}

/* 수정된 내용을 로컬 스토리지에 업데이트 */
function updateLocalStorage(cnt, newWriter, newcontent, newstar) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  if (cnt >= 0 && cnt <= posts.length) {
    posts[cnt].writer = newWriter;
    posts[cnt].content = newcontent;
    posts[cnt].star = newstar;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

/* 1-3. 수정 취소하기 ----------------------------------------------*/
function cancel() {
  let editForm = document.getElementById('editf'); // 수정폼div를 변수에 담기

  setTimeout(() => {
    editForm.classList.toggle('editf'); // 화면에 사라지게 하고 자리 뺌
  }, 30);

  // 수정글에 붙여놓은 수정폼을 다시 <body>로 돌려놓음 (원래 자리)
  document.getElementsByTagName('body')[0].appendChild(editForm);
}

/* 2. 삭제 -------------------------------------------------------*/
function del(cnt) {
  let pwd = prompt('글 비밀번호');
  let delDiv = document.getElementById('d_' + cnt);
  if (pwd == delDiv.pwd) {
    // <div id = "list"> <delDiv> </div>
    document.getElementById('list').removeChild(delDiv);
    // 로컬 스토리지에서도 삭제
    deleteFromLocalStorage(cnt);
  } else {
    alert('글 비밀번호 불일치. 삭제 취소');
  }
}

/* 글 삭제 시 로컬 스토리지에서 삭제 */
function deleteFromLocalStorage(idx) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  // 해당 글번호를 가진 글 삭제
  posts.splice(idx, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
}

/* 1-3. 수정 취소하기 ----------------------------------------------*/
function cancel() {
  let editForm = document.getElementById('editf'); // 수정폼div를 변수에 담기

  setTimeout(() => {
    editForm.classList.toggle('editf'); // 화면에 사라지게 하고 자리 뺌
  }, 30);

  // 수정글에 붙여놓은 수정폼을 다시 <body>로 돌려놓음 (원래 자리)
  document.getElementsByTagName('body')[0].appendChild(editForm);
}

/* 2. 삭제 -------------------------------------------------------*/
function del(cnt) {
  let pwd = prompt('글 비밀번호');
  let delDiv = document.getElementById('d_' + cnt);
  if (pwd == delDiv.pwd) {
    // <div id = "list"> <delDiv> </div>
    document.getElementById('list').removeChild(delDiv);
    // 로컬 스토리지에서도 삭제
    deleteFromLocalStorage(cnt);
  } else {
    alert('글 비밀번호 불일치. 삭제 취소');
  }
}

/* 글 삭제 시 로컬 스토리지에서 삭제 */
function deleteFromLocalStorage(cnt) {
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  // 해당 글번호를 가진 글 삭제
  posts = posts.filter((post, index) => index !== cnt);
  localStorage.setItem('posts', JSON.stringify(posts));
}
