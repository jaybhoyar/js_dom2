// JS
let input = document.querySelector("input[type=text]");
let ul = document.querySelector("ul");

function addTodo(event) {
	// console.log(event.target.value);
	if (event.keyCode === 13 && event.target.value != "") {
		let li = document.createElement("li");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		let p = document.createElement("p");
		p.innerHTML = event.target.value;
		let span = document.createElement("span");
		span.innerText = "X";
		li.classList.add("li_styles");
		ul.append(li);
		li.append(checkInput, p, span);
		event.target.value = "";
		p.addEventListener("dblclick", e => {
			// console.log(e.target);
			let currentP = e.target;
			let editInput = document.createElement("input");
			editInput.classList.add("edit_input");
			editInput.value = currentP.innerHTML;
			currentP.parentElement.replaceChild(editInput, currentP);
			editInput.addEventListener("keydown", event1 => {
				if (event1.keyCode === 13 && event1.target.value != "") {
					currentP.innerHTML = editInput.value;
					editInput.parentElement.replaceChild(currentP, editInput);
				}
			});
		});
		span.addEventListener("click", eSpan => {
			eSpan.target.parentElement.remove();
		});
	}
}

input.addEventListener("keydown", addTodo);
