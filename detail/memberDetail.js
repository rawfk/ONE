import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDELnW_B2sw9wuh9HWqGOK7H1sCDRb6icM",
  authDomain: "sparta-ed4eb.firebaseapp.com",
  projectId: "sparta-ed4eb",
  storageBucket: "sparta-ed4eb.appspot.com",
  messagingSenderId: "892038211675",
  appId: "1:892038211675:web:a49dcb9a75e4fc1f2d377e",
  measurementId: "G-C9EYT4FXC1",
}

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// 데이터를 가져와서 댓글 카드 생성하는 함수
async function loadComments() {
// Firebase에서 데이터 가져오기
  const docs = await getDocs(collection(db, "cmt"));

  // 댓글 카드 생성
  docs.forEach((doc) => {
    const data = doc.data();
    const username = data.username;
    const commentText = data.commentText;

    if (username && commentText) {
      // 새로운 댓글 카드 생성
      const commentCard = 
      `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${username}</h5>
            <p class="card-text">${commentText}</p>
            <button class="btn delete-btn header_btn">X</button>
          </div>
        </div>
      `
      // 댓글 카드를 댓글 박스에 추가
      $("#postingbox").append(commentCard)
    }
  })
}

// 페이지 로드시 댓글 로딩
loadComments();

// 댓글 추가 버튼 클릭 이벤트 처리
$("#postingbtn").click(async function () {
  const username = $("#replyId").val()
  const commentText = $("#Textarea1").val()
  const doc = {
    username: username,
    commentText: commentText,
  };

  // 데이터 저장
  await addDoc(collection(db, "cmt"), doc)
  alert("저장완료")

  // 페이지 리로드
  window.location.reload()
});


// 삭제 버튼 클릭 이벤트
$("#postingbox").on("click", ".delete-btn", async function () {
  // 클릭된 삭제 버튼의 부모 댓글 카드를 찾기
  const commentCard = $(this).closest(".card");

  // 댓글 카드에서 username과 commentText를 가져옴
  const username = commentCard.find(".card-title").text()
  const commentText = commentCard.find(".card-text").text()

  // Firestore에서 해당 데이터를 식별하고 삭제
  const querySnapshot = await getDocs(collection(db, "cmt"))
  querySnapshot.forEach(async (doc) => {
    const data = doc.data()
    if (data.username === username && data.commentText === commentText) {
      // 일치하는 데이터를 삭제
      await deleteDoc(doc.ref)
      // 댓글 카드를 화면에서도 제거
      commentCard.remove();
      alert("댓글이 삭제되었습니다.")
    }
  })
})


$('#homeBtn').click(function() {
  location.href = ".."
})

//get a doc reference with id query string
let id = new URLSearchParams(location.search).get('id')
if(id==null || id == '') {
  alert('잘못된 접근입니다.')
  location.replace('..')
}
let docRef = doc(db, 'members', id)

//get a doc with ref and make dynamic html tags
let result = await getDoc(docRef)
let imageVal, gatherVal, nameVal, mbtiVal, goalVal, passwordVal, strengthVal, collabStyleVal, contactVal;
if(result.exists()) {
    let row = result.data()
    imageVal = row['user-imageURL']
    gatherVal = row['user-gatherURL']
    nameVal = row['user-name']
    mbtiVal = row['user-mbti']
    goalVal = row['user-goal']
    passwordVal = row['user-password']
    strengthVal = row['user-strength']
    collabStyleVal = row['user-collabStyle']
    contactVal = row['user-contact']

    let member_html =
        `
        <div class="introduce">
          <h2>이름 : ${nameVal}</h2>
          <div class="my_photo">
            <img src="${imageVal}">
          </div>
        </div>
        
        <div class="my_introduce">
            <h2>한마디 : ${goalVal}</h2>
            <h2>MBTI: ${mbtiVal}</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Contact</h2>
            <a href="${contactVal}">${contactVal}</a>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        <div class="my_self">
            <h2>객관적으로 본 자신장점</h2>
            ${strengthVal}
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            <div class="my_style">
            <h2>자신의 스타일 & 협업 스타일</h2>
            ${collabStyleVal}
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        `
    $('#member').append(member_html)
} else {
    alert('잘못된 접근입니다.')
    location.replace('..')
}

//make a pwd form
 $('#updateBtn').click(function(){
  let chkPwd = 
      `
      <div class="modal-background" id="chkPwd">
          <div class="chkModal">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">비밀번호를 입력하시오.</h5>
                      <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <input type="password" placeholder="Password" class="form-control" id="password">
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">닫기</button>
                      <button type="button" class="btn btn-primary" id="pwdBtn">확인</button>
                  </div>
              </div>
          </div>
      </div>
      `
  $('body').append(chkPwd)
})

 //get an update form
 $('body').on('click', '#pwdBtn', pwdFunc)
 $('body').on('keydown', '#password', function(e) {if(e.keyCode == 13) pwdFunc()})

//update the data
$('body').on('click', '#updateMember', async function(){
  let updateData = {
    'user-imageURL': $('#image').val(),
    'user-gatherURL': $('#gather').val(),
    'user-name': $('#name').val(),
    'user-mbti': $('#mbti').val(),
    'user-goal': $('#goal').val(),
    'user-password': $('#password').val(),
    'user-strength': $('#strength').val(),
    'user-collabStyle': $('#collabStyle').val(),
    'user-contact': $('#contact').val(),
  }
  await updateDoc(doc(db, 'members', id), updateData)
           .then(function() {
              alert('수정 완료')
              location.replace($(location).attr('href'))
          })
})

//close func
$('body').on('click', '.close', function(){ 
  $(this).parent().parent().parent().parent().remove('')
})

//check the pwd and make an update form
function pwdFunc(){ 
  if(passwordVal == $('#password').val()) {
      //비밀번호 모달창 삭제
      $('#chkPwd').remove()
      //모달창 제공
      let update_html = 
      `
      <div class="modal-background" >
          <div class="updateModal">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">멤버 정보 수정</h5>
                      <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div class="modal-body">
                      <div class="updateMemberBox" id="updateMemberBox"">
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="게더 이미지 주소" class="form-control" id="gather" value=${gatherVal}>
                              <label for="floatingInput">게더 이미지 주소</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="이미지 주소" class="form-control" id="image" value=${imageVal}>
                              <label for="floatingInput">이미지 주소</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="이름" class="form-control" id="name" value=${nameVal}>
                              <label for="floatingInput">이름</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="MBTI" class="form-control" id="mbti" value=${mbtiVal}>
                              <label for="floatingInput">MBTI</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="각오" class="form-control" id="goal" value=${goalVal}>
                              <label for="floatingInput">Goal</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="password" placeholder="Password" class="form-control" id="password" value=${passwordVal}>
                              <label for="floatingInput">Password</label>
                          </div>
                          <div class="form-floating mb-3">
                              <textarea class="form-control" placeholder="객관적인 자신의 장점" id="strength" style="height: 100px">${strengthVal}</textarea>
                              <label for="floatingTextarea2">객관적인 자신의 장점</label>
                          </div>
                          <div class="form-floating mb-3">
                              <textarea class="form-control" placeholder="자신의 협업 스타일" id="collabStyle" style="height: 100px">${collabStyleVal}</textarea>
                              <label for="floatingTextarea2">자신의 협업 스타일</label>
                          </div>
                          <div class="form-floating mb-3">
                              <input type="text" placeholder="깃허브 주소" class="form-control" id="contact" value=${contactVal}>
                              <label for="floatingInput">깃허브 주소</label>
                          </div>
                      </div>
                  </div>

                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">닫기</button>
                      <button type="button" id="updateMember" class="btn btn-primary">저장</button>
                  </div>

              </div>
          </div>
      </div>
      `
      $('body').append(update_html)
  } else {
      alert('비밀번호가 틀렸습니다.')
  }
}