class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
    }
    addBook(book) {
        this.myLibrary.push(book);
        addBookToLibrary(book);
    }
}

function addBookToLibrary(book) {
    const library = document.querySelector("#library");
    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    bookContainer.textContent = `${book.title}
    ${book.author}
    ${book.numPages}
    ${book.isRead}`;
    library.appendChild(bookContainer);
}

const library = new Library();

const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => {
    createForm();
    
});


function createForm() {
    const addBookDetails = document.querySelector("#add-book");
    const bookForm = document.createElement("form");
    const title = document.createElement("input");// prompt("Enter the title of the book you want to add");
    const author = document.createElement("input");//prompt("Enter the author of the book you want to add");
    const numPages = document.createElement("input");//prompt("Enter the number of pages of the book you want to add");
    const isRead = document.createElement("input");//prompt("Enter whether you have read it or not");
    bookForm.appendChild(title);
    bookForm.appendChild(author);
    bookForm.appendChild(numPages);
    bookForm.appendChild(isRead);
    addBookDetails.appendChild(bookForm);
    const enterBtn = document.createElement("button");
    enterBtn.textContent = "Enter";
    addBookDetails.appendChild(enterBtn);
    enterBtn.addEventListener("click", () => {
        library.addBook(new Book(title.value, author.value, numPages.value, isRead.value));
        console.log(library.myLibrary);
        addBookDetails.removeChild(bookForm);
        addBookDetails.removeChild(enterBtn);
    });
    
}