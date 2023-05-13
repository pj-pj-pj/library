function Book(title, author, noPages, isRead) {
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.isRead = isRead ? "done reading" : "not read yet";
  this.info = function () {
    return `"${this.title} by ${this.author}, ${this.noPages} pages, ${this.isRead}"`
  };

}

let myLibrary = [];

function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

function showLibrary(library) {
  let lib = "";
  for (let book of library) {
    lib += book.info() + "\n";
  }

  return lib;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theHobbit2 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit2);
console.log(showLibrary(myLibrary));