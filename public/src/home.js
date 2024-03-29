function topFive(item) {
  return item.sort((itemA, itemB) => itemB.count - itemA.count).slice(0,5);
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowed = 0;
  books.forEach(book => book.borrows[0].returned === false && borrowed++)
  return borrowed;
}

function getMostCommonGenres(books) {
  const result = {};
   books.forEach(book => {
    if (result[book.genre] == null) {
      result[book.genre] = 1;
    } else {
      result[book.genre] += 1;
    }
  })
  let list = []; 
  for (const [key, value] of Object.entries(result)) {
    list.push ({
      name:key,
      count:value,
    })
  }
  //Helper Function
  return topFive(list);
}

function getMostPopularBooks(books) {
const borrows = books.map(book =>(
  {name: book.title,
  count: book.borrows.length}
));
//Helper Function
return topFive(borrows);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map(author => ({
    ...author,
    bookCount: books.filter(book => book.authorId === author.id).length,
    borrowCount: books.filter(book => book.authorId === author.id)
    .reduce((acc, read) => acc + read.borrows.length, 0)
  }));
  popularAuthors.sort((authorA, authorB) => authorB.borrowCount - authorA.borrowCount);
  popularAuthors.length = 5;
  return popularAuthors.map(item => {
    return {
      name: item.name.first + " " + item.name.last,
      count: item.borrowCount,
    }
  })
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
