/*  ==================================
    search books by input field
==================================  */
const searchBook = () => {
    const searchText = document.getElementById("search-field").value;
    loadBooks(searchText);
    toggleSpinner("block");
    document.getElementById("search-field").value = "";
}
/*  ==================================
    show spinner between load and display 
==================================  */
const toggleSpinner = displayStyle => {
    document.getElementById("spinner").style.display = displayStyle;
};

/*  ==================================
    load searched books by input value
==================================  */
const loadBooks = (searchText) => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
};

/* counting books */
const bookNumbers = (numbers) => {
    // console.log(numbers);
    const numberOfBook = document.getElementById("books-number");
    console.log(numberOfBook);
    numberOfBook.textContent = "";
    const div = document.createElement("div");
    // h2.classList.add("")
    if (numbers === "0") {
        div.innerHTML = `<h2 class="text-info">No Result found</h2>`;
        numberOfBook.appendChild(div);
    }
    else {
        div.innerHTML = `<h2 class="text-info">You found ${numbers} books</h2>`;
        numberOfBook.appendChild(div);
    }

}
/*  ==================================
    display searched books 
==================================  */
const displayBooks = books => {
    // console.log(books.length);
    const countingBooks = `${books.length}`;
    bookNumbers(countingBooks);
    const bookContainer = document.getElementById("books");
    bookContainer.textContent = "";
    if (!books) {
        const errorMessage = document.getElementById("error-result").style.display = "block";
    }
    books?.forEach(book => {
        const div = document.createElement("div");
        div.classList.add('col');
        const publisher = `${book.publisher}`.slice(0, 15);
        const authorName = `${book.author_name}`.slice(0, 15);

        div.innerHTML = `        
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="This book cover image is not available" height="300rem">
                <div class="card-body">
                    <h3 class="card-title">${book.title ? book.title : ""}</h3>
                    <h6>By: <span class="text-info"> ${authorName ? authorName : ""}</span></h6>
                    <h5 class="fs-6 fw-normal">First published in: <span class="text-primary fs-5 fw-bold"> ${book.first_publish_year ? book.first_publish_year : ""}</span></h5>                    
                </div>
                <div class="card-footer">
                    <small class="text-muted"><span>Publisher: </span> ${publisher ? publisher : ""}</small>
                </div>
            </div>
        `;
        bookContainer.appendChild(div);
    });
    toggleSpinner("none");
};

// loadBooks('javascript');


