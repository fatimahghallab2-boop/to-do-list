
let tasks = [];

const txt = document.getElementById("txt");
const btn = document.getElementById("enter");
const list = document.getElementById("list");

// دالة العرض (تضيف data-index للأزرار عشان نعرف رقم المهمة بالضبط)
function fillTasksOnPage() {
    list.innerHTML = "";
    tasks.forEach(function(task, index) {
        let completedClass = task.completed ? "completed" : "";
        
        // تغير شكل أيقونة الإكمال على حسب الحالة
        let checkIconClass = task.completed ? "fa-xmark" : "fa-check";

        let li = `<li class="${completedClass}"> ${task.text} 
        <div class="task-action"> 

        <button class="delete" data-index="${index}"> <i class="fa-solid fa-trash"></i> </button>

        <button class="check-btn" data-index="${index}"> <i class="fa-solid ${checkIconClass}"></i> </button>

        <button class="edit-btn" data-index="${index}"> <i class="fa-solid fa-pen"></i> </button> </div>
        </li>`;
        list.innerHTML += li;
    });
}

btn.addEventListener("click", function(){
    if(txt.value !== ""){
        tasks.push({ text: txt.value, completed: false });
        
        storeTasks();
        fillTasksOnPage();

        txt.value = "";
        txt.style.borderColor = ""; 
        txt.placeholder = "اكتب المهمة";
    }
    else {
        txt.style.borderColor = "red";
        txt.placeholder = "الرجاء ادخال المهمة";
    }
});

list.addEventListener("click", function(e){
    // نجيب الزر حتى لو الضغطة جاءت على أيقونة الـ i اللي جواته
    let btnElement = e.target.closest("button");
    if (!btnElement) return;

    let index = btnElement.getAttribute("data-index");

    if(btnElement.classList.contains("delete")){
        tasks.splice(index, 1); // نحذف بفرز الترتيب
        storeTasks();
        fillTasksOnPage();
    }
    else if(btnElement.classList.contains("check-btn")){
        tasks[index].completed = !tasks[index].completed;
        storeTasks();
        fillTasksOnPage();
    }
    else if(btnElement.classList.contains("edit-btn")){
        let newtxt = prompt("اكتب النص الجديد", tasks[index].text);
        if(newtxt) {
            tasks[index].text = newtxt;
            storeTasks();
            fillTasksOnPage();
        }
    }
});

// دالة الحفظ
function storeTasks() {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}

// دالة القراءة عند التحميل
function getTasksFromStorage() {
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = retrievedTasks ?? [];
    fillTasksOnPage();
}

getTasksFromStorage();