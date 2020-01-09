// JS
let input = document.querySelector("input[type=text]");
let ul = document.querySelector("ul");
let footerList = document.querySelector(".footer");
let counter = document.querySelector(".counter");
let state = JSON.parse(localStorage.getItem("todoArr")) || [];
let id = -1;
let para = document.querySelector(".para");
let all_button = document.querySelector("#all_button");
let active_button = document.querySelector("#active_button");
let completed_button = document.querySelector("#completed_button");
let clearCompleted = document.querySelector(".item-completed");

function AddState(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		var todo = {
			name: event.target.value,
			isDone: false,
			id: ++id
		};

		state.push(todo);
		localStorage.setItem("todoArr", JSON.stringify(state));
		event.target.value = "";
		todoArray = JSON.parse(localStorage.getItem("todoArr"));
		viewTodo(todoArray);
	}
}

function viewTodo(todoArray) {
	ul.innerHTML = "";

	todoArray.forEach(i => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		li.setAttribute("data-id", i.id);
		p.classList.add("para");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.checked = i.isDone;
		checkInput.type = "checkbox";
		li.classList.add("li_styles");
		spanX.className = "remove_items";
		spanX.setAttribute("data-key", i.id);
		p.innerHTML = i.name;
		spanX.innerHTML = "X";
		ul.append(li);
		li.append(checkInput, p, spanX);
		let checkId = checkInput.parentElement.dataset.id;
		checkInput.addEventListener("click", () => handleCheck(checkId));
		p.addEventListener("dblclick", EditTodo);
		active_button.addEventListener("click", activeStatus);
		if (i.isDone == true) {
			clearCompleted.classList.remove("item-completed");
			clearCompleted.classList.add("item-completed-1");
		}
	});

	if (todoArray.length > 0) {
		footerList.style.display = "block";
		clearCompleted.classList.remove("item-completed");
		clearCompleted.classList.add("item-completed-1");
	} else {
		footerList.style.display = "none";
	}
	counter.textContent = itemCount();
}
function EditTodo(event) {
	// console.log(e.target);
	if (event.target.tagName === "P") {
		let currentP = event.target;
		let editInput = document.createElement("input");
		editInput.type = "text";
		editInput.classList.add("edit_input");
		editInput.value = currentP.textContent;
		console.log(editInput, "in edittodo");
		console.log(currentP.parentElement, currentP);
		currentP.parentElement.replaceChild(editInput, currentP);
		editInput.addEventListener("keydown", event1 => {
			if (event1.keyCode === 13 && event1.target.value != "") {
				currentP.textContent = editInput.value;
				editInput.parentElement.replaceChild(currentP, editInput);
			}
		});
	}
}
function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		state = state.filter(i => !(target.dataset.key == i.id));
		localStorage.setItem("todoArr", JSON.stringify(state));
		viewTodo(state);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = state.map(item => {
		if (item.id == id) {
			len += len;
			item.isDone = !item.isDone;

			if (item.isDone == true) {
				clearCompleted.classList.remove("item-completed");
				clearCompleted.classList.add("item-completed-1");
			} else {
				clearCompleted.classList.add("item-completed");
				clearCompleted.classList.remove("item-completed-1");
			}
			return item;
		} else return item;
	});
	localStorage.setItem("todoArr", JSON.stringify(checked));
	viewTodo(checked);
	itemCount(len);
}
function itemCount() {
	let arr = state.filter(i => i.isDone == false);
	return arr.length;
}
function allStatus() {
	all_button.classList.add("button-border");
	completed_button.classList.remove("button-border");
	active_button.classList.remove("button-border");
	console.log("in all");
	viewTodo(state);
}
function activeStatus(event) {
	all_button.classList.remove("button-border");
	completed_button.classList.remove("button-border");
	active_button.classList.add("button-border");
	let arr = state.filter(i => i.isDone == false);
	viewTodo(arr);
	footerList.style.display = "block";
}
function completedStatus(event) {
	all_button.classList.remove("button-border");
	active_button.classList.remove("button-border");
	completed_button.classList.add("button-border");
	let arr = state.filter(i => i.isDone == true);
	viewTodo(arr);
	footerList.style.display = "block";
	// all_button.classList.add("button-border");
}
function clearStatus() {
	let arr = state.filter(i => i.isDone == false);
	localStorage.setItem("todoArr", JSON.stringify(arr));
	state = arr;
	viewTodo(state);
	footerList.style.display = "block";
}
input.addEventListener("keydown", AddState);
ul.addEventListener("click", deleteTodo);
active_button.addEventListener("click", activeStatus);
all_button.addEventListener("click", allStatus);
all_button.classList.add("button-border");
completed_button.addEventListener("click", completedStatus);
clearCompleted.addEventListener("click", clearStatus);
viewTodo(state);
