var data = JSON.parse(localStorage.getItem("listData")) || [];
document.querySelector(".btn-new").addEventListener("click", addTodos);
var deleteallmBtn = document.querySelector("#deleteall");

updateList(data); //頁面一載入更新畫面

document
  .querySelector(".todo-input")
  .addEventListener("keypress", function (e) {
    if (e.which === 13) {
      addTodos();
    }
  });

function addTodos() {
  const inputValue = document.querySelector(".todo-input").value;
  if (inputValue.trim().length === 0) {
    alert("請輸入文字");
    return;
  } //確認是否為空值
  var listValue = {
    content: inputValue,
  };
  data.push(listValue);
  updateList(data); //把新資料更新跑迴圈

  localStorage.setItem("listData", JSON.stringify(data));
  //把目前的資訊 存在listData key裡面
  document.querySelector(".todo-input").value = "";
}

//新增todo

// const newTodo = document.querySelector(".todolist");
// newTodo.classList.add("todo");

// 更新網頁內容
function updateList(items) {
  const newTodo = document.querySelector(".todo-list");
  str = "";
  var len = items.length;
  for (var i = 0; i < len; i++) {
    str += `
    <li>
  <label class="todo-title">
 <input class="todo-check" type="checkbox">
 <span>${items[i].content}</span>
 </label>
 <button class="btn-delete" data-index=${i}><i class="fas fa-times"></i></button>
    </li>
  `;
  }
  newTodo.innerHTML = str;

  // // 大於三筆資料時 出現刪除全部按鈕

  if (data.length < 4) {
    deleteallmBtn.classList.add("hide");
  } else {
    deleteallmBtn.classList.remove("hide");
  }
}

// 刪除代辦事項
document.querySelector(".todo-list").addEventListener("click", function (e) {
  if (e.target.nodeName != "BUTTON") {
    return;
  }

  var index = e.target.dataset.index;
  data.splice(index, 1); //刪除全域變數再把它重新設置道localstorage
  localStorage.setItem("listData", JSON.stringify(data));

  updateList(data);
  // if (e.target.classList.contains("btn-delete")) {
  //   e.target.parentNode.remove(); //刪除畫面中
  // }
});
//刪除全部
// var deleteallmBtn =document.querySelector("#deleteall");
deleteallmBtn.addEventListener("click", function () {
  let allmsg = "確定刪除全部資料嗎?";
  if (confirm(allmsg) == true) {
    data = [];
  } else {
    return false;
  }

  updateList(data);
});

updateList(data);
// document
//   .querySelector(".todo-list")
//   .addEventListener("click", function (event) {
//     const target = event.target;
//     if (target.classList.contains("todo-check")) {
//       target.parentNode.classList.toggle("todo__done");
//     }
//   });

var isStart = false;

document.getElementById("start").addEventListener("click", function () {
  isStart = !isStart;
  if (isStart) {
    $("#start-icon").toggleClass("far fa-stop-circle", false); // 刪除 暫停classname
    $("#start-icon").toggleClass("fa-play-circle", true); // 新增 撥放classname
    $("#start-icon").toggleClass("far", true); // 新增 定位樣式classname

    window.clearInterval(intervalId);
  } else {
    // $("#start-icon").toggleClass("far fa-play-circle");
    $("#start-icon").toggleClass("fa-stop-circle", true);
    $("#start-icon").toggleClass("far", true);

    var myAuto = document.getElementById("myaudio");
    myAuto.play();
    myAuto.currentTime = 0;

    intervalId = setInterval(() => {
      currentTimeLeft--;
      displayCurrentTimeLeftInSession();
    }, 1000);
  }
});

let workDuration = 1500; //60*25
let currentTimeLeft = 1500;
let breakDuration = 300;
var intervalId;

const displayCurrentTimeLeftInSession = () => {
  const secondLeft = currentTimeLeft;

  let result = "";
  const seconds = secondLeft % 60;
  const minutes = parseInt(secondLeft / 60) % 60;
  function addZero(time) {
    return time < 10 ? `0${time}` : time;
  }

  result += `${addZero(minutes)}:${addZero(seconds)}`;
  var a = document.getElementById("clockdiv");
  a.innerText = result.toString();

  if (currentTimeLeft == 0) {
    clearInterval(intervalId);
    var myAuto = document.getElementById("myaudio2");
    myAuto.play();
    myAuto.currentTime = 0;
    clockdiv.innerHTML = "05:00";
    currentTimeLeft = 300;
    $("#start-icon").toggleClass("far fa-stop-circle", false); // 刪除 暫停classname
    $("#start-icon").toggleClass("fa-play-circle", true); // 新增 撥放classname
    $("#start-icon").toggleClass("far", true); // 新增 定位樣式classname
  }
};
