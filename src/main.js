const inputBox = document.querySelector(".input input");
const addBtn = document.querySelector(".input button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = (e) => {
    // lay gia tri user nhap vao
    let userEnteredValue = inputBox.value;
    // neu user nhpa vao gia tri khac rong
    if (userEnteredValue.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
    // Nếu nhấn Enter thì tự động thêm task
    if (e.key === "Enter" && userEnteredValue.trim() != 0) {
        addBtn.click();
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

    deleteAllBtn.classList.add("active");
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li draggable="true" data-index="${index}">${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i> </span> </li>`;
    });
    todoList.innerHTML = newLiTag; //them li tag vao trong ul
    inputBox.value = ""; //xoa gia tri trong o input sau khi them cong viec vao danh sach

    // Drag and drop events
    const items = todoList.querySelectorAll("li");
    let dragSrcIndex = null;
    items.forEach(item => {
        item.addEventListener("dragstart", function(e) {
            dragSrcIndex = +this.getAttribute("data-index");
            e.dataTransfer.effectAllowed = "move";
            this.classList.add("dragging");
        });
        item.addEventListener("dragend", function(e) {
            this.classList.remove("dragging");
        });
        item.addEventListener("dragover", function(e) {
            e.preventDefault();
            this.classList.add("dragover");
        });
        item.addEventListener("dragleave", function(e) {
            this.classList.remove("dragover");
        });
        item.addEventListener("drop", function(e) {
            e.preventDefault();
            this.classList.remove("dragover");
            const dropIndex = +this.getAttribute("data-index");
            if (dragSrcIndex !== null && dragSrcIndex !== dropIndex) {
                // Swap vị trí
                const temp = listArray[dragSrcIndex];
                listArray.splice(dragSrcIndex, 1);
                listArray.splice(dropIndex, 0, temp);
                localStorage.setItem("New Todo", JSON.stringify(listArray));
                showTasks();
            }
        });
    });
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