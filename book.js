function Book(title, author, noPages, isRead) {
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.isRead = isRead ? "finished" : "unfinished";
  this.info = function () {
    return `"${this.title} by ${this.author}, ${this.noPages} pages, ${this.isRead}"`
  };

}

function addBookToLibrary(Book, lib) {
  lib.push(Book);
}

function displayBooks(library) {
  const cardContainer = document.querySelector('container');

  for (const book of library) {
    const newCard = document.createElement('div');
    newCard.className = 'card';

    const title = document.createElement('h2');
    title.textContent = book.title;
    title.className = 'title';

    const author = document.createElement('p');
    author.textContent = book.author;
    author.className = 'author';

    const pages = document.createElement('p');
    pages.textContent = book.noPages;
    pages.className = 'pages';

    const isReadBtn = document.createElement('button');
    isReadBtn.textContent = book.isRead;
    isReadBtn.className = 'isReadBtn';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(isReadBtn);
    newCard.appendChild(removeBtn);

    cardContainer.appendChild(newCard);
  }
}


let myLibrary = [];
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theHobbit2 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit, myLibrary);
addBookToLibrary(theHobbit2, myLibrary);

displayBooks(myLibrary);



