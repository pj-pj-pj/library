class Library {
  constructor() {
    this.bookshelf = [];
  }

  cardContainer = document.querySelector('container');

  add(book) {
    this.bookshelf.push(book);
    this.display(book);
  }

  display(book) {
    const newCard = document.createElement('div');
    newCard.className = 'card';

    const title = document.createElement('h2');
    title.textContent = book.title;
    title.className = 'title';

    const author = document.createElement('p');
    author.textContent = book.author;
    author.className = 'author';

    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;
    pages.className = 'pages';

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const isReadBtn = document.createElement('button');
    isReadBtn.textContent = book.isRead ? "finished" : "unfinished";
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

    this.cardContainer.appendChild(newCard);

    this.addBorder.call(isReadBtn);
  }

  updateIsRead() {
    if (this.textContent == 'finished') {
      this.textContent = 'unfinished';
    } else {
      this.textContent = 'finished';
    }
  }

  addBorder() {
    const parent = this.parentNode;
    const grandparent = parent.parentNode;

    if (this.textContent == 'finished') {
      grandparent.classList.add('finished-card');
    } else {
      grandparent.classList.remove('finished-card');
    }
  }

  delete(target) {
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    this.bookshelf = this.bookshelf.filter(book => {
      return `${book.title}-${book.author}` !== target.getAttribute('data-index');
    });

    grandparent.remove();
  }
}

function createBook(title, author, pages, isRead) {
  return { title, author, pages, isRead };
}

const myLibrary = new Library();
const firstBook = createBook('The Hobbit', 'J.R.R. Tolkien', 295, true);
myLibrary.add(firstBook);

//event listeners
const cardContainer = document.querySelector('container');
const modalContainer = document.querySelector('.modal-container');
const trigger = document.querySelector('#add-book');
const closeBtn = document.querySelector('.close-button');
const pagesField = document.getElementById('pages');
const submitBtn = document.querySelector('input[type ="submit"]');

trigger.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnCLick);
pagesField.addEventListener('keypress', checkPages);
submitBtn.addEventListener('click', submit);
cardContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('isread-btn')) {
    myLibrary.updateIsRead.call(e.target);
    myLibrary.addBorder.call(e.target);
  }
  if (e.target.classList.contains('remove-btn')) {
    myLibrary.delete(e.target);
  } else if (e.target.parentNode.classList.contains('remove-btn')) {
    myLibrary.delete(e.target.parentNode);
  }
});

//functions
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
  } else if (myLibrary.bookshelf.some(book => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase())) {
    const existsWarningMsg = document.querySelector('.exists');
    existsWarningMsg.style.display = 'block';

    setTimeout(function () {
      existsWarningMsg.style.display = 'none';
    }, 2000);
  } else {
    toggleModal();
    const newBook = createBook(title, author, pages, false);
    myLibrary.add(newBook);
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