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
    pages.textContent = `${book.noPages} pages`;
    pages.className = 'pages';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const isReadBtn = document.createElement('button');
    isReadBtn.textContent = book.isRead;
    isReadBtn.className = 'isread-btn';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    const icon = document.createElement('img');
    icon.className = 'remove-icon';
    icon.src = 'delete.png';
    icon.alt = 'Delete';

    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(isReadBtn);
    newCard.appendChild(btnContainer);
    btnContainer.appendChild(isReadBtn);
    btnContainer.appendChild(removeBtn);
    removeBtn.appendChild(icon);

    cardContainer.appendChild(newCard);

    addBorderifRead(isReadBtn);
  }
}

function updateReadState() {
  if (this.textContent == 'finished') {
    this.textContent = 'unfinished';
  } else {
    this.textContent = 'finished';
  }
  addBorderifRead(this);
}

function addBorderifRead(btn) {
  const parent = btn.parentNode;
  const grandparent = parent.parentNode;

  if (btn.textContent == 'finished') {
    grandparent.classList.add('finished-card');
  } else {
    grandparent.classList.remove('finished-card');
  }
}

let myLibrary = [];
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const theHobbit2 = new Book('The Hobbit 2', 'J.R.R. Tolkien', 295, false);
const theHobbitsf = new Book('The Hobbit 3', 'J.R.R. Tolkien', 295, false);
const ttheHobbit2 = new Book('The Hobbit 4', 'J.R.R. Tolkien', 295, false);
const hWorld = new Book('Hello World asdkasjdksjd aslkddsj kajskjasalksasj', 'Ada Lovelace', 495, true);
addBookToLibrary(theHobbit, myLibrary);
addBookToLibrary(theHobbit2, myLibrary);
addBookToLibrary(theHobbitsf, myLibrary);
addBookToLibrary(ttheHobbit2, myLibrary);
addBookToLibrary(hWorld, myLibrary);
displayBooks(myLibrary);

const rmvBtns = document.querySelectorAll('.isread-btn');

rmvBtns.forEach(btn => {
  btn.addEventListener('click', updateReadState)
});





