// JS
let input = document.querySelector("input[type=text]");
let ul = document.querySelector("ul");
let footerList = document.querySelector(".footer");
let counter = document.querySelector(".counter");
let state = [];
let id = -1;
let para = document.querySelector(".para");
let all_button = document.querySelector("#all_button");
// let active_button = document.querySelector("#active_button");
// let completed_button = document.querySelector("#completed_button");

function AddState(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		var todo = {
			name: event.target.value,
			isDone: false,
			id: ++id
		};
		// state = state.concat(todo);
		state.push(todo);
		event.target.value = "";
		viewTodo(state);
	}
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

		// console.log(editInput);
	}
	// console.log(currentP.innerHTML);
	// let editInput = document.createElement("input");
	// editInput.type = "text";
	// editInput.classList.add("edit_input");
	// editInput.value = currentP.innerHTML;
	// currentP.parentElement.replaceChild(editInput, currentP);
	// console.log(editInput.type);
	//
}

function viewTodo(todoArray) {
	ul.innerHTML = "";
	todoArray.forEach((i, index) => {
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
		// debugger;
		ul.append(li);

		li.append(checkInput, p, spanX);

		let checkId = checkInput.parentElement.dataset.id;
		checkInput.addEventListener("click", () => handleCheck(checkId));
		p.addEventListener("dblclick", EditTodo);
		active_button.addEventListener("click", activeStatus);
	});
	if (todoArray.length > 0) {
		footerList.style.display = "block";
	} else {
		footerList.style.display = "none";
	}
	counter.textContent = itemCount();
}

function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		state = state.filter(i => !(target.dataset.key == i.id));
		viewTodo(state);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = state.map(item => {
		if (item.id == id) {
			len += len;
			item.isDone = !item.isDone;
			return item;
		} else return item;
	});
	viewTodo(checked);
	itemCount(len);
}
function itemCount(length) {
	return state.length;
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
}
function completedStatus(event) {
	all_button.classList.remove("button-border");
	active_button.classList.remove("button-border");
	completed_button.classList.add("button-border");
	let arr = state.filter(i => i.isDone == true);
	viewTodo(arr);
}

input.addEventListener("keydown", AddState);
ul.addEventListener("click", deleteTodo);
active_button.addEventListener("click", activeStatus);
all_button.addEventListener("click", allStatus);
all_button.classList.add("button-border");
completed_button.addEventListener("click", completedStatus);
