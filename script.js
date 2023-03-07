

const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pageSize = 3;
let currentPage = 1;
let filteredBooks = [];

async function getBooks() {
    try {
        const response = await fetch('https://anapioficeandfire.com/api/books');
        const data = await response.json();
        const books = data.slice(0, 50);
        filteredBooks = books;
        displayBooks(filteredBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    } catch (error) {
        console.error(error);
    }
}

function displayBooks(books) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        const title = document.createElement('h2');
        title.textContent = book.name;
        const subtitle = document.createElement('h3');
        subtitle.textContent = `ISBN: ${book.isbn} | Pages: ${book.numberOfPages}`;
        const author = document.createElement('p');
        author.textContent = `Author(s): ${book.authors.join(', ')}`;
        const publisher = document.createElement('p');
        publisher.textContent = `Publisher: ${book.publisher} | Released: ${book.released}`;
        const characters = document.createElement('p');
        characters.textContent = `Characters: ${book.characters.slice(0, 5).join(', ')}`;
        li.appendChild(title);
        li.appendChild(subtitle);
        li.appendChild(author);
        li.appendChild(publisher);
        li.appendChild(characters);
        bookList.appendChild(li);
    });
}

function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    filteredBooks = searchInput.value.trim() === '' ? getBooks() : filteredBooks.filter(book => {
        return book.name.toLowerCase().includes(searchTerm) ||
            book.authors.join(', ').toLowerCase().includes(searchTerm) ||
            book.characters.join(', ').toLowerCase().includes(searchTerm);
    });
    displayBooks(filteredBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayBooks(filteredBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    }
}

function nextPage() {
    if ((currentPage + 1) * pageSize < filteredBooks.length) {
        currentPage++;
        displayBooks(filteredBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
    }
}

searchButton.addEventListener('click', filterBooks);
prevButton.addEventListener('click', prevPage);
nextButton.addEventListener('click', nextPage);

getBooks();

