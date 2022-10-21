const { partitionBooksByBorrowedStatus, findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return (partitionBooksByBorrowedStatus(books))[0].length;
}

function getMostCommonGenres(books) {
  let genreList = [];
  books.forEach(({genre}) => {
    const genreIndex = genreList.findIndex(({name: genreName}) => genreName == genre);
    if (genreIndex > -1) {
      genreList[genreIndex].count++
    } else {
      genreList.push({name: `${genre}`, count: 1});
    }
  })

  return topFiveByCount(genreList);
}

function getMostPopularBooks(books) {
  let bookList = books.map(({title: name, borrows}) => {
    return {name, count: borrows.length};
  })

  return topFiveByCount(bookList);
}

function getMostPopularAuthors(books, authors) {
  let authorList = []
  books.forEach(({authorId, borrows}) => {
    const authorIndex = authorList.findIndex(({name}) => name == authorId);
    if (authorIndex > -1) {
      authorList[authorIndex].count += borrows.length;
    } else {
      authorList.push({id: authorId, count: borrows.length});
    }
  })

  authorList = authorList.map(({id, count}) => {
    const {name} = findAuthorById(authors, id);
    const authorName = `${name.first} ${name.last}`;
    return {name: authorName, count};
  })

  return topFiveByCount(authorList);
}

function topFiveByCount(array) {
  return array.sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
