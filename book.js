let myLibrary = [];

const firstBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(firstBook, myLibrary);

const submitBtn = document.querySelector('input[type ="submit"]');
const cardContainer = document.querySelector('container');
const modalContainer = document.querySelector('.modal-container');
const trigger = document.querySelector('#add-book');
const closeBtn = document.querySelector('.close-button');
const pagesField = document.getElementById('pages');

submitBtn.addEventListener('click', submit);

cardContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('isread-btn')) {
    updateReadState.call(e.target);
    addBorderifRead.call(e.target);
  }

  if (e.target.classList.contains('remove-btn')) {
    deleteBook.call(e.target);
  } else if (e.target.parentNode.classList.contains('remove-btn')) {
    deleteBook.call(e.target.parentNode);
  }
})

trigger.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnCLick);
pagesField.addEventListener('keypress', checkPages);

function submit(e) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);

  if (title === '' || author === '' || isNaN(pages)) {
    const warningMsg = document.querySelector('.required-warning')
    warningMsg.style.display = 'block';

    setTimeout(function () {
      warningMsg.style.display = 'none';
    }, 2000);
  } else {
    toggleModal();
    const newBook = new Book(title, author, pages, false);
    addBookToLibrary(newBook, myLibrary);
  }

  e.preventDefault();
}

function Book(title, author, noPages, isRead) {
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.isRead = isRead ? "finished" : "unfinished";
}

function addBookToLibrary(Book, lib) {
  lib.push(Book);
  displayBook(Book);
}


function displayBook(book) {
  const cardContainer = document.querySelector('container');

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

  removeBtn.setAttribute('data-index', book.title);

  newCard.appendChild(title);
  newCard.appendChild(author);
  newCard.appendChild(pages);
  newCard.appendChild(isReadBtn);
  newCard.appendChild(btnContainer);
  btnContainer.appendChild(isReadBtn);
  btnContainer.appendChild(removeBtn);
  removeBtn.appendChild(icon);

  cardContainer.appendChild(newCard);
  addBorderifRead.call(isReadBtn);
}

function updateReadState() {
  if (this.textContent == 'finished') {
    this.textContent = 'unfinished';
  } else {
    this.textContent = 'finished';
  }
}

function addBorderifRead() {
  const parent = this.parentNode;
  const grandparent = parent.parentNode;

  if (this.textContent == 'finished') {
    grandparent.classList.add('finished-card');
  } else {
    grandparent.classList.remove('finished-card');
  }
}

function deleteBook() {
  const parent = this.parentNode;
  const grandparent = parent.parentNode;
  const removeElement = this.getAttribute('data-index')

  myLibrary = myLibrary.filter(book => book.title !== removeElement);
  grandparent.remove();
}

function toggleModal() {
  modalContainer.classList.toggle("show");
}

function windowOnCLick(e) {
  if (e.target === modalContainer) {
    toggleModal();
  }
}

function checkPages(e) {
  const charCode = e.charCode;
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }

  e.preventDefault();
  return false;
}
