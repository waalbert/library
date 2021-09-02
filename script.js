class Book {
    constructor(title, author, numPages, isRead) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.isRead = isRead;
    }
    read() {
        if (!this.isRead) {
            this.isRead = true;
        } else {
            this.isRead = false;
        }
        console.log(this.isRead);
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
    }
    addBook(book) {
        this.myLibrary.push(book);
        this.displayBooks();
        // addBookToLibrary(book);
    }
    removeBook(book) {
        const bookIndex = this.myLibrary.indexOf(book);
        console.log(bookIndex);
        libraryDiv.removeChild(document.getElementById(bookIndex));
        this.myLibrary.splice(bookIndex, 1);

    }
    displayBooks() {
        this.resetBooks();
        for (let i = 0; i < this.myLibrary.length; i++) {
            const bookContainer = document.createElement("div");
            bookContainer.classList.add("book");
            const titleDiv = document.createElement("div");
            titleDiv.textContent = this.myLibrary[i].title;
            // titleDiv.classList.ad÷
            const authorDiv = document.createElement("div");
            authorDiv.textContent = this.myLibrary[i].author;
            const pagesDiv = document.createElement("div");
            pagesDiv.textContent = this.myLibrary[i].numPages;
            const isReadDiv = document.createElement("div");
            isReadDiv.textContent = this.myLibrary[i].isRead;
            // bookContainer.textContent = `
            // ${}
            // ${}
            // ${}`;
            bookContainer.appendChild(titleDiv);
            bookContainer.appendChild(authorDiv);
            bookContainer.appendChild(pagesDiv);
            bookContainer.appendChild(isReadDiv);
            bookContainer.id = i;
            const deleteBookBtn = document.createElement("button");
            deleteBookBtn.textContent = "DELETE";
            deleteBookBtn.addEventListener("click", () => this.removeBook(this.myLibrary[i]));
            const isReadBtn = document.createElement("button");
            isReadBtn.textContent = "READ?";
            isReadBtn.addEventListener("click", this.myLibrary[i].read);
            bookContainer.appendChild(deleteBookBtn);
            bookContainer.appendChild(isReadBtn);
            libraryDiv.appendChild(bookContainer);
            
        }
    }
    resetBooks() {
        libraryDiv.textContent = "";
    }
}

// function addBookToLibrary(book) {


// }

// function removeBookFromLibrary(e) {
//     libraryDiv.removeChild(e.target);
// }

const library = new Library();

const libraryDiv = document.querySelector("#library");
let isFormOpen = false;

const newBookBtn = document.querySelector("#new-book");
newBookBtn.addEventListener("click", () => {
    if (isFormOpen) {
        deleteForm();
    } else {
        createForm();
    }
    // library.displayBooks();
});


function createForm() {
    isFormOpen = true;
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
    const enterBtn = document.createElement("button");
    enterBtn.textContent = "Enter";
    bookForm.appendChild(enterBtn);
    addBookDetails.appendChild(bookForm);
    
    
    enterBtn.addEventListener("click", () => {
        library.addBook(new Book(title.value, author.value, numPages.value, isRead.value));
        console.log(library.myLibrary);
        addBookDetails.removeChild(bookForm);
        // addBookDetails.removeChild(enterBtn);
        isFormOpen = false;
    });

}

function deleteForm() {
    isFormOpen = false;
    const addBookDetails = document.querySelector("#add-book");
    const bookForm = document.querySelector("form");
    addBookDetails.removeChild(bookForm);
}