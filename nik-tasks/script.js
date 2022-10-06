main()

const accs = document.querySelectorAll('.accBtn')
const domAccordionExample = document.querySelector('.accordionExample');





domAccordionExample.addEventListener('click', (event) => {
	if (event.target.classList.contains('accBtn')) {
		event.target.classList.toggle('active')
		let accContent = event.target.nextElementSibling

		if (accContent.style.display === "block") {
			accContent.style.display = "none"
		} else {
			accContent.style.display = "block"
		}
	}
})
// accs.forEach(function (accs) {
// 	accs.addEventListener("click", function () {
// 		this.classList.toggle('active')
// 		let accContent = this.nextElementSibling

// 		if (accContent.style.display === "block") {
// 			accContent.style.display = "none"
// 		} else {
// 			accContent.style.display = "block"
// 		}
// 	})
// })

const tabs = document.querySelector(".tabsExample")
const tabButton = document.querySelectorAll(".tabLink")
const contents = document.querySelectorAll(".tabContent")

tabs.onclick = e => {
	const id = e.target.dataset.id
	if (id) {
		tabButton.forEach(btn => {
			btn.classList.remove("active")
		})
		e.target.classList.add("active")

		contents.forEach(content => {
			content.classList.remove("active")
		})
		const element = document.getElementById(id)
		element.classList.add("active")
	}
}

async function getData() {
	const response = await fetch('https://api.github.com/users/mosmain/repos')
	return response.json()
}

async function main() {
	const gitData = await getData()
	let currentPage = 1
	let rows = 2

	displayList(gitData, rows, currentPage)
	displayPagination(gitData, rows)

}

function displayList(arrData, rowPerPage, page) {
	const postsEl = document.querySelector('.posts')
	postsEl.innerHTML = ""
	page--

	const start = rowPerPage * page
	const end = start + rowPerPage
	const paginatedData = arrData.slice(start, end)

	paginatedData.forEach((el) => {
		const postEl = document.createElement("div")
		postEl.classList.add("post")
		postEl.innerText = `${el.name}`
		postsEl.appendChild(postEl)
	})
}

function displayPagination(arrData, rowPerPage) {
	const paginationEl = document.querySelector('.pagination');
	const pagesCount = Math.ceil(arrData.length / rowPerPage);
	const ulEl = document.createElement("ul");
	ulEl.classList.add('pagination');

	for (let i = 0; i < pagesCount; i++) {
		const liEl = displayPaginationBtn(i + 1);
		ulEl.appendChild(liEl)
	}
	paginationEl.appendChild(ulEl)
}

function displayPaginationBtn(page, currentPage) {
	const liEl = document.createElement("li");
	liEl.classList.add('page-link')
	liEl.innerText = page

	if (currentPage === page) liEl.classList.add('active');

	liEl.addEventListener('click', () => {
		currentPage = page
		displayList(gitData, rows, currentPage)

		let currentItemLi = document.querySelector('.active');
		currentItemLi.classList.remove('active');

		liEl.classList.add('active');
	})

	return liEl;
}
