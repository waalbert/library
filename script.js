/*
* Hardest part of this project is definitely linking the book objects in memory 
* to the "books" displayed. 
* Solutions: giving each book object a unique id related to its position in
* the library array. However, problems arise when deleting books, as I need
* to update every remaining book's corresponding id.
* Hold up, I found a solution. I just used Node.childNodes instead. This worked.
*/
class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
    read() {
        if (this.isRead === false) {
            this.isRead = true;
        } else if (this.isRead === true) {
            this.isRead = false;
        }
        library.displayBooks();
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
    }
    addBook(book) {
        this.myLibrary.push(book);
        this.displayBooks();
    }
    removeBook(book) { // there's a bug where if I delete books some books wouldn't delete
        const bookIndex = this.myLibrary.indexOf(book);
        const bookDiv = libraryDiv.childNodes[bookIndex];
        this.myLibrary.splice(bookIndex, 1);
        libraryDiv.removeChild(bookDiv);
        this.displayBooks();
        
    }
    displayBooks() {
        this.resetBooks();
        for (let i = 0; i < this.myLibrary.length; i++) {
            const bookContainer = document.createElement("div");
            bookContainer.classList.add("book");
            const titleDiv = document.createElement("div");
            titleDiv.textContent = `"${this.myLibrary[i].title}"`;
            const authorDiv = document.createElement("div");
            authorDiv.textContent = this.myLibrary[i].author;
            const pagesDiv = document.createElement("div");
            pagesDiv.textContent = `${this.myLibrary[i].numPages} pages`;
            const isReadDiv = document.createElement("div");
            if (this.myLibrary[i].isRead === true) {
                isReadDiv.textContent = "Read";
            } else {
                isReadDiv.textContent = "Not Read";
            }
            isReadDiv.id = "isRead";
            bookContainer.appendChild(titleDiv);
            bookContainer.appendChild(authorDiv);
            bookContainer.appendChild(pagesDiv);
            bookContainer.appendChild(isReadDiv);
            bookContainer.id = i;
            bookContainer.appendChild(bookUI.createDeleteBtn(i));
            bookContainer.appendChild(bookUI.createIsReadBtn(i));
            libraryDiv.appendChild(bookContainer);
        }
    }
    resetBooks() {
        libraryDiv.textContent = "";
    }
}

const form = (() => {
    const create = () => {
        isFormOpen = true;
        const addBookDetails = document.querySelector("#add-book");
        const bookForm = document.createElement("form");
        const title = document.createElement("input");// prompt("Enter the title of the book you want to add");
        title.placeholder = "Enter title";
        const author = document.createElement("input");//prompt("Enter the author of the book you want to add");
        author.placeholder = "Enter author";
        const numPages = document.createElement("input");//prompt("Enter the number of pages of the book you want to add");
        numPages.placeholder = "Enter numPages";
        const isRead = document.createElement("input");//prompt("Enter whether you have read it or not");
        isRead.type = "checkbox";
        // isRead.name = "isRead";
        const isReadText = document.createElement("label");
        // isRead.for = "isRead";
        isReadText.textContent = "Is Read";

        // isRead.placeholder = "Enter isRead";
        bookForm.appendChild(title);
        bookForm.appendChild(author);
        bookForm.appendChild(numPages);
        bookForm.appendChild(isRead);
        bookForm.appendChild(isReadText);
        const enterBtn = document.createElement("button");
        enterBtn.textContent = "Enter";
        bookForm.appendChild(enterBtn);
        addBookDetails.appendChild(bookForm);


        enterBtn.addEventListener("click", () => {
            library.addBook(new Book(title.value, author.value, numPages.value, isRead.checked));
            console.log(library.myLibrary);
            addBookDetails.removeChild(bookForm);
            // addBookDetails.removeChild(enterBtn);
            isFormOpen = false;
            updateLocalStorage();
            // localStorage.setItem("library", JSON.stringify(library.myLibrary));
        });
    };
    const remove = () => {
        isFormOpen = false;
        const addBookDetails = document.querySelector("#add-book");
        const bookForm = document.querySelector("form");
        addBookDetails.removeChild(bookForm);
    };
    return { create, remove };
})();

const bookUI = (() => {
    const createDeleteBtn = (i) => {
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.textContent = "DELETE";
        deleteBookBtn.addEventListener("click", () => {
            // console.log(library.myLibrary[i]);
            library.removeBook(library.myLibrary[i]);
            updateLocalStorage();
        });
        return deleteBookBtn;
    };
    const createIsReadBtn = (i) => {
        const isReadBtn = document.createElement("button");
        isReadBtn.textContent = "READ?";
        isReadBtn.addEventListener("click", () => {
            library.myLibrary[i].read();
            updateLocalStorage();
        });
        return isReadBtn;
    };

    return { createDeleteBtn, createIsReadBtn };
})();

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library.myLibrary));
}

function JSONToBook(book) {
    return new Book(book.title, book.author, book.numPages, book.isRead);
}

const library = new Library();

const libraryDiv = document.querySelector("#library");
let isFormOpen = false;

const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => {
    if (isFormOpen) {
        form.remove();
    } else {
        form.create();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const books = JSON.parse(localStorage.getItem("library"));
    if (localStorage.getItem("library")) {
        library.myLibrary = books.map(book => JSONToBook(book));
        library.displayBooks();
    } else {
        library.myLibrary = [];
    }
});