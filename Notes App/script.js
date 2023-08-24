const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// 로컬 스토리지에서 노트를 표시하는 함수
function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes"); // 로컬 스토리지에서 "notes" 항목을 가져와 컨테이너에 표시
}
showNotes();

// 현재 노트로 로컬 스토리지를 업데이트하는 함수
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML); // 노트 컨테이너의 HTML 내용으로 로컬 스토리지의 "notes" 항목 업데이트
}

// "생성" 버튼에 클릭 이벤트 리스너 추가
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img); // 입력과 삭제 이미지가 있는 단락 요소를 노트 컨테이너에 추가
})

// 노트 컨테이너에 클릭 이벤트 리스너 추가
notesContainer.addEventListener("click", function(e){
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove(); // 클릭된 삭제 이미지의 부모 요소 제거 (노트를 포함한 단락 요소)
        updateStorage();
    }
    else if(e.target.tagName === "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){ // onkeyup: 키를 눌렀다가 떼었을 때 이벤트 발생, onkeydown: 키를 눌렀을 때 이벤트 발생
                updateStorage();
            }
        })
    }
})

// 문서 전체에 키다운 이벤트 리스너 추가
document.addEventListener("keydown", event => {
    if(event.key === "Enter"){
    document.execCommand("insertLineBreak"); // Enter 키를 누르면 줄 바꿈(새 줄) 삽입
    event.preventDefault(); // Enter 키의 기본 동작(일반적으로 새 단락 생성) 방지
    }
})