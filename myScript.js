
let books = [
    {
        id: 0,
        title: "Married with Zombies",
        author: "Jesse Petersen"
    },
    {
        id: 1,
        title: "Feed",
        author: "Mira Grant"
    },
    {
        id: 2,
        title: "Things fall apart",
        author: "Chinua Achebe"
    }
]


function saveToStorage(){
    localStorage.setItem('collections', JSON.stringify(books));
}

function getBooksFromStorage() {
    const storedBooks = localStorage.getItem('collections');
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    }
  }
  
 const newTitle = document.querySelector('form #title')
const newAuthor = document.querySelector('form #author')
const addButton = document.querySelector('#add')
const shelve = document.querySelector(".shelve")

addButton.addEventListener("click", (e)=>{
    if(newTitle.value === '' || newAuthor.value === '') return
    else {
        e.preventDefault();

        let id = books.length
       books.map(c=>{ 
        while(c.id === id){
            id++
        }
    })

        const title = newTitle.value
        const author = newAuthor.value

        const newBook = {id, title, author }

        books.push(newBook)

        newTitle.value = ''
        newAuthor.value = ''

        shelve.innerHTML = ''
        displayBooks()
        saveToStorage()
    }
})

const displayBooks = () => {
    books.forEach((book)=>{
// creating the elements that form a book div
        const bookDiv = document.createElement("div")
        bookDiv.classList.add("book-div")

        bookDiv.innerHTML += `<h2>${book.title} </h2><p>${book.author} </p>`

        const button = document.createElement("button")
        button.className = "remove"
        button.innerHTML = "Remove"

        const rule = document.createElement("hr")
        rule.className = "line"
// append the remove button and the horizontal rule to the book div
        bookDiv.append(button, rule)
// append the book div to the dom
        shelve.appendChild(bookDiv)
    })
    const removeBtns = document.querySelectorAll('.remove')
    removeBtns.forEach((removeBtn, btnIndex)=>{
        removeBtn.addEventListener('click', ()=>{
            // console.log(books)
            books = books.filter(book=> book.id !== btnIndex)
            // console.log(books)
            const removeBtnParent = removeBtn.parentNode
            removeBtnParent.remove()
            saveToStorage()
        })
    })
}

 // To Call the function when the page loads
 window.onload = () => {
    getBooksFromStorage();
    displayBooks();
    saveToStorage();
  }
