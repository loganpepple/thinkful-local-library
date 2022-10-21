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
  let genres = books.reduce((list, {genre}) => {
    const genreIndex = list.findIndex(({name: genreName}) => genreName == genre);
    if (genreIndex > -1) {
      list[genreIndex].count++
    } else {
      list.push({name: `${genre}`, count: 1});
    }
    return list;
  }, [])

  return topFiveByCount(genres);
}

function getMostPopularBooks(books) {
  let bookList = books.map(({title: name, borrows}) => {
    return {name, count: borrows.length};
  })

  return topFiveByCount(bookList);
}

function getMostPopularAuthors(books, authors) {
  let authorList = books.reduce((list, {authorId, borrows}) => {
    const authorIndex = list.findIndex(({name}) => name == authorId);
    if (authorIndex > -1) {
      list[authorIndex].count += borrows.length;
    } else {
      list.push({id: authorId, count: borrows.length});
    }
    return list;
  }, [])

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
