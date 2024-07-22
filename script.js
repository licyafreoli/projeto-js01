let books = [];

function displayBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<h3>${book.title}</h3>
                         <p><strong>Author:</strong> ${book.author}</p>
                         <p><strong>Genre:</strong> ${book.genre}</p>
                         <p><strong>Year:</strong> ${book.year}</p>
                         <p><strong>Rating:</strong> ${book.rating.toFixed(1)}</p>
                         <button onclick="showRatingModal(${index})">Rate</button>
                         <hr>`;
    bookList.appendChild(bookDiv);
  });

  populateRatingOptions();
}

function addBook(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const year = parseInt(document.getElementById('year').value);
  
  const newBook = {
    title: title,
    author: author,
    genre: genre,
    year: year,
    rating: 0
  };

  books.push(newBook);

  displayBooks();

  document.getElementById('addBookForm').reset();
}

function searchBooks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchInput) ||
    book.author.toLowerCase().includes(searchInput) ||
    book.genre.toLowerCase().includes(searchInput)
  );
  displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(filteredBooks) {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  filteredBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<h3>${book.title}</h3>
                         <p><strong>Author:</strong> ${book.author}</p>
                         <p><strong>Genre:</strong> ${book.genre}</p>
                         <p><strong>Year:</strong> ${book.year}</p>
                         <p><strong>Rating:</strong> ${book.rating.toFixed(1)}</p>
                         <button onclick="showRatingModal(${books.indexOf(book)})">Rate</button>
                         <hr>`;
    bookList.appendChild(bookDiv);
  });
}

function sortBooks() {
  const sortCriteria = document.getElementById('sortCriteria').value;
  if (sortCriteria === 'rating') {
    books.sort((a, b) => b.rating - a.rating);
  } else {
    books.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
  }
  displayBooks();
}

function populateRatingOptions() {
  const ratingBookSelect = document.getElementById('ratingBook');
  ratingBookSelect.innerHTML = '';
  books.forEach((book, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = book.title;
    ratingBookSelect.appendChild(option);
  });
}

function showRatingModal(bookIndex) {
  const selectedBook = books[bookIndex];
  const ratingValue = prompt(`Rate "${selectedBook.title}" (1-5):`);
  if (ratingValue !== null && ratingValue !== '') {
    const rating = parseFloat(ratingValue);
    if (!isNaN(rating) && rating >= 1 && rating <= 5) {
      selectedBook.rating = (selectedBook.rating + rating) / 2;
      displayBooks();
    } else {
      alert('Please enter a valid rating between 1 and 5.');
    }
  }
}

displayBooks();

document.getElementById('addBookForm').addEventListener('submit', addBook);

function rateBook() {
  const selectedBookIndex = document.getElementById('ratingBook').value;
  const ratingValue = parseFloat(document.getElementById('ratingValue').value);

  if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    alert('Please enter a valid rating between 1 and 5.');
    return;
  }

  books[selectedBookIndex].rating = (books[selectedBookIndex].rating + ratingValue) / 2;
  displayBooks();
}
