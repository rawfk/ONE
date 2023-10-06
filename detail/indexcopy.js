import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7wnoL-dx4_QOLtkkauNLBlapTof4ItHg",
  authDomain: "sparta-2775c.firebaseapp.com",
  projectId: "sparta-2775c",
  storageBucket: "sparta-2775c.appspot.com",
  messagingSenderId: "281222929699",
  appId: "1:281222929699:web:32f2a10bd3aadf272e0096",
  measurementId: "G-NM09216G07",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$("#postingbtn").click(async function () {
  let username = $("#replyId").val();
  let commentText = $("#Textarea1").val();
  let doc = {
    username: username,
    commentText: commentText,
  };
  // 데이터 저장
  await addDoc(collection(db, "cmt"), doc);
  alert("저장완료");
  window.location.reload();
});
// 열고 닫는 버튼
$("#savebtn").click(async function () {
  $("#postingbox").toggle();
});



// 댓글 데이터 가져오기
let cmtDocs = await getDocs(collection(db, "cmt"));
cmtDocs.forEach((doc) => {
  let row = doc.data();

  let username = row["username"];
  let commentText = row["commentText"];

  if (username && commentText) {
    // 새로운 댓글 카드 생성
    let commentCard = `
            <div class="comments">
                <div class="card-body">
                    <h5 class="card-title">${username}</h5>
                    <p class="card-text">${commentText}</p>
                </div>
            </div>
        `;

    // 댓글 카드를 댓글 박스에 추가
    $("#postingbox").append(commentCard);

   
    // 입력 필드 초기화
    $("#replyId").val("");
    $("#Textarea1").val("");
  }
});

//Query String
let id = new URLSearchParams(location.search).get('id')
//get query result
let result = query(collection(db, 'members'), where('id', '==', id))
//get docs
let memberDocs = await getDocs(result)
memberDocs.forEach(doc => {
    let row = doc.data()

    let image = row['image']
    let name = row['name']
    let mbti = row['mbti']
    let strength = row['strength']
    let collabStyle = row['collabStyle']
    let contact = row['contact']
    let goal = row['goal']
    let member_html =
        `
        <div class="contents1"><h2>한마디 : ${goal}</h2></div>
        <div class="introduce">
            <div class="my_photo">
                <img src="${image}">
            </div>
        </div>

        <div class="my_introduce">
            <h2>이름: ${name}</h2>
            <h2>MBTI: ${mbti}</h2>
            <h2>Contact</h2>
            ${contact}
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        <div class="my_self">
            <h2>객관적으로 본 자신장점</h2>
            ${strength}
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            <div class="my_style">
            <h2>자신의 스타일 & 협업 스타일</h2>
            ${collabStyle}
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
        `
    $('#member').append(member_html)
})