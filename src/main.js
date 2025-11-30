const inputBox = document.querySelector(".input input");
const addBtn = document.querySelector(".input button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    // lay gia tri user nhap vao
let userEnteredValue = inputBox.value;
// neu user nhpa vao gia tri khac rong
if (userEnteredValue.trim() != 0) {
    // thi nut add cau ta se sang len
    //truong hop nhap toan khoang trang (space) se khong tinh la gia tri hop le
    addBtn.classList.add("active");
} else {
    // nguoc lai nut add se bi an di
    addBtn.classList.remove("active");
}

}
showTasks(); //goi ham hien thi cong viec
addBtn.onclick = () => {
    // lay gia tri user nhap vao
    let userEnteredValue = inputBox.value;
    // lay gia tri tu local storage
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userEnteredValue);
    // convert sang JSON string va luu vao local storage
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //cap nhat so luong cong viec

    if (listArray.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i> </span> </li>`;
    });
    todoList.innerHTML = newLiTag; //them li tag vao trong ul
    inputBox.value = ""; //xoa gia tri trong o input sau khi them cong viec vao danh sach
}
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    //xoa phan tu duoc chi dinh khoi mang
    listArray.splice(index, 1);
    //cap nhat lai local storage sau khi xoa
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //goi ham hien thi cong viec
}
deleteAllBtn.onclick = () => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //goi ham hien thi cong viec
}