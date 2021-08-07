function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const unavailable = [];
  const available = [];
  const status = [];
  books.forEach(book => {
    if (book.borrows[0].returned === false) {
      unavailable.push(book);
    } else {
      available.push(book);
    }
  })
  status.push(unavailable);
  status.push(available);
  return status;
}

function getBorrowersForBook(book, accounts) {
  //Create a new array with each borrow, featuring id and returned display.
  const borrowers = book.borrows.map(({id, returned})=> {
    //In each borrow, use the id display to compare with all the accounts. Return the account of interest.
    const person = accounts.find(account => account.id === id);
    //This will return the account of interest and status to the "borrowers" variable and nothing else.
    return {...person, returned};
  })
  //Limit to 10 using .slice
  return borrowers.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
