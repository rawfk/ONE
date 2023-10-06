import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
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
// 데이터가져오기
let docs = await getDocs(collection(db, "cmt"));
docs.forEach((doc) => {
  let row = doc.data();
  console.log(row);

  let username = row["username"];
  let commentText = row["commentText"];

  if (username && commentText) {
    // 새로운 댓글 카드 생성
    let commentCard = `
            <div class="card">
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
