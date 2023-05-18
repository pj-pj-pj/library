let myLibrary = [];

const firstBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(firstBook, myLibrary);

function Book(title, author, noPages, isRead) {
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.isRead = isRead ? "finished" : "unfinished";
}


const cardContainer = document.querySelector('container');
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
});


function displayBook(book) {
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

  removeBtn.setAttribute('data-index', `${book.title}-${book.author}`);

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


function addBookToLibrary(Book, lib) {
  lib.push(Book);
  displayBook(Book);
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

  myLibrary = myLibrary.filter(book => {
    const bookToRemove = `${book.title}-${book.author}`;
    return bookToRemove !== removeElement;
  });
  grandparent.remove();
}


const modalContainer = document.querySelector('.modal-container');
const trigger = document.querySelector('#add-book');
const closeBtn = document.querySelector('.close-button');
const pagesField = document.getElementById('pages');

trigger.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnCLick);
pagesField.addEventListener('keypress', checkPages);

function toggleModal() {
  modalContainer.classList.toggle("show");
  clearFields();
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


const submitBtn = document.querySelector('input[type ="submit"]');
submitBtn.addEventListener('click', submit);

function submit(e) {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = parseInt(pagesInput.value);

  if (title === '' || author === '' || isNaN(pages)) {
    const warningMsg = document.querySelector('.required');
    warningMsg.style.display = 'block';

    setTimeout(function () {
      warningMsg.style.display = 'none';
    }, 2000);
  } else if (myLibrary.some(book => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase())) {
    const existsWarningMsg = document.querySelector('.exists');
    existsWarningMsg.style.display = 'block';

    setTimeout(function () {
      existsWarningMsg.style.display = 'none';
    }, 2000);
  } else {
    toggleModal();
    const newBook = new Book(title, author, pages, false);
    addBookToLibrary(newBook, myLibrary);
  }

  e.preventDefault();
}


function clearFields() {
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const pagesInput = document.getElementById('pages');

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = ''
}