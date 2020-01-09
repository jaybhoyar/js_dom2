// JS
let input = document.querySelector("input[type=text]");
let ul = document.querySelector("ul");
let footerList = document.querySelector(".footer");
let counter = document.querySelector(".counter");
let state = JSON.parse(localStorage.getItem("todoArr")) || [];
let id = Date.now();
let para = document.querySelector(".para");
let all_button = document.querySelector("#all_button");
let active_button = document.querySelector("#active_button");
let completed_button = document.querySelector("#completed_button");
let clearCompleted = document.querySelector(".item-completed");
viewTodo(state);

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
		li.setAttribute("data-index", i.id);
		spanX.className = "remove_items";
		spanX.setAttribute("data-key", i.id);
		p.innerHTML = i.name;
		spanX.innerHTML = "×";
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
		// clearCompleted.classList.remove("item-completed");
		// clearCompleted.classList.add("item-completed-1");
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
		currentP.parentElement.replaceChild(editInput, currentP);
		editInput.parentElement.classList.remove("li_styles");
		editInput.parentElement.classList.add("li_styles_input");
		editInput.setAttribute("data-inputid", 0);
		editInput.addEventListener("keydown", event1 => {
			if (event1.keyCode === 13 && event1.target.value != "") {
				editInput.parentElement.classList.add("li_styles");
				editInput.parentElement.classList.remove("li_styles_input");
				currentP.textContent = editInput.value;
				editInput.parentElement.replaceChild(currentP, editInput);
				let arr = state;
				arr.map(i => {
					if (i.id == currentP.parentElement.dataset.index) {
						// console.log(currentP.parentElement.dataset.index, i.id);
						i.name = currentP.textContent;
						// console.log(i.name);
					}
				});
				localStorage.setItem("todoArr", JSON.stringify(arr));
				console.log(arr);
				viewTodo(arr);
				// state.map(i => {
				// 	console.log(i.id);
				// });

				// state = state.forEach(i => {
				// 	if (event1.target == i) {

				// 	}
				// });
			}
		});
	}
}
function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		state = state.filter(i => !(target.dataset.key == i.id));
		state.forEach(i => {
			if (i.isDone == true) {
				clearCompleted.classList.remove("item-completed");
				clearCompleted.classList.add("item-completed-1");
			} else {
				clearCompleted.classList.remove("item-completed-1");
				clearCompleted.classList.add("item-completed");
			}
		});
		localStorage.setItem("todoArr", JSON.stringify(state));
		viewTodo(state);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = state.map(item => {
		if (item.id == id) {
			len++;
			item.isDone = !item.isDone;

			if (item.isDone == true) {
				clearCompleted.classList.remove("item-completed");
				clearCompleted.classList.add("item-completed-1");
			} else {
				clearCompleted.classList.remove("item-completed-1");
				clearCompleted.classList.add("item-completed");
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
	arr.forEach(i => {
		if (i.isDone == true) {
			clearCompleted.classList.remove("item-completed");
			clearCompleted.classList.add("item-completed-1");
		} else {
			clearCompleted.classList.remove("item-completed-1");
			clearCompleted.classList.add("item-completed");
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	state = arr;
	viewTodo(state);
}
input.addEventListener("keydown", AddState);
ul.addEventListener("click", deleteTodo);
active_button.addEventListener("click", activeStatus);
all_button.addEventListener("click", allStatus);
all_button.classList.add("button-border");
completed_button.addEventListener("click", completedStatus);
clearCompleted.addEventListener("click", clearStatus);
