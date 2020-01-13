const input = document.querySelector(".addbook_input");
const searchinput = document.querySelector(".search_input");
const addbtn = document.querySelector(".add_button");
const checkbox = document.querySelector("#hide");
const ul = document.querySelector("ul");
let bookArr = JSON.parse(localStorage.getItem("bookArr")) || [];
id = Date.now();

function addBook(event) {
	if (input.value.trim() != "") {
		let book = {
			name: input.value,
			id: ++id
		};
		bookArr.push(book);
		localStorage.setItem("bookArr", JSON.stringify(bookArr));
		event.target.value = "";
		bookArr = JSON.parse(localStorage.getItem("bookArr"));
		viewBook(bookArr);
	}
}
// function addBookByButton(event) {
// 	if (event.target.tagName == "BUTTON") {
// 		addBook();
// 	}
// }
function viewBook(bookArr) {
	ul.innerHTML = "";
	bookArr.forEach(book => {
		let li = document.createElement("li");
		let img = document.createElement("img");
		let p = document.createElement("p");
		let div = document.createElement("div");
		let deleteButton = document.createElement("button");
		img.classList.add("book_img");
		p.classList.add("book_name");
		div.classList.add("delete_div");
		deleteButton.classList.add("delete_button");
		img.src = "book.png";
		p.textContent = book.name;
		deleteButton.innerHTML = "Delete";
		deleteButton.addEventListener("click", deleteBook);
		li.setAttribute("data-id", book.id);
		deleteButton.setAttribute("data-id", book.id);
		div.append(deleteButton);
		li.append(img, p, div);
		ul.append(li);
	});
}

function deleteBook(event) {
	let target = event.target;
	bookArr = bookArr.filter(book => !(target.dataset.id == book.id));
	localStorage.setItem("bookArr", JSON.stringify(bookArr));
	viewBook(bookArr);
}

function searchBook(event) {
	if (event.target.value.trim() != "") {
		let searchWord = event.target.value.toLowerCase();
		let searchedArr = bookArr.filter(book =>
			book.name.toLowerCase().includes(searchWord)
		);
		viewBook(searchedArr);
	}
}
function handleCheck(event) {
	if (event.target.checked == true) {
		ul.style.display = "none";
	} else {
		ul.style.display = "block";
	}
}
viewBook(bookArr);
// input.addEventListener("keydown", addBook);
searchinput.addEventListener("keyup", searchBook);
checkbox.addEventListener("click", handleCheck);
addbtn.addEventListener("click", addBook);
