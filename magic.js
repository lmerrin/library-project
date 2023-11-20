const DIALOG = document.querySelector("dialog");

//Make Library Array to Store Books:
const myLibrary = [];

//Class Definition for Book:
class Book {
  constructor(title, author, year, pages, isRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//Function to Add a Book to the Library:
function addBookToLibrary(title, author, year, pages, isRead) {
  const newBook = new Book(title, author, year, pages, isRead);
  myLibrary.push(newBook);
}

//Function to Display Books:
function displayBooks() {
  const bookContainer = document.getElementById("book-container");
  // Clear the existing content-
  bookContainer.innerHTML = "";

  // Loop through the array and display each book-
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Display book information- using backticks for "special terms"-
    bookCard.innerHTML = `
    <ul>
        <li>Title: ${book.title}</li>
        <li>Author: ${book.author}</li>
        <li>Year: ${book.year}</li>
        <li>Pages: ${book.pages}</li>
        <li>Read: ${book.isRead ? "Yes" : "No"}</li>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <button class="toggle-read-btn" data-index="${index}">Toggle Read Status</button>
      `;

    // Attach the book card to the container-
    bookContainer.appendChild(bookCard);
  });

  // Set up "event listeners" for remove and toggle read status buttons-
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", () =>
      removeBook(button.getAttribute("data-index"))
    );
  });

  document.querySelectorAll(".toggle-read-btn").forEach((button) => {
    button.addEventListener("click", () =>
      toggleReadStatus(button.getAttribute("data-index"))
    );
  });
}


//Function to handle closing dialog
function closeDialog() {
  document.querySelector(`dialog`).close();
}

///Function to prevent default and not opening a new page on submit:
function handleFormSubmit(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("read").value === "yes";

  //Function to Handle Form Submission:
  addBookToLibrary(title, author, year, pages, isRead);
  displayBooks();
  DIALOG.close();
}

//Function to Remove a Book from the Library:
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

//Function to Toggle Read Status of a Book:
function toggleReadStatus(index) {
  myLibrary[index].isRead = !myLibrary[index].isRead;
  displayBooks();
}

//Set up event listeners:
document.getElementById("new-book-btn").addEventListener("click", () => {
  DIALOG.showModal();
});
document
  .getElementById("book-form")
  .addEventListener("submit", handleFormSubmit);
document
  .getElementById("close-dialog-btn")
  .addEventListener("click", closeDialog);

//Example: Manually adding a few books to the library:
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 1937, 310, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960, 281, false);

//Display the initial set of books:
displayBooks();
