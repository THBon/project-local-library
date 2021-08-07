function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
};

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1:-1);
}

//Amount of time an account id appeard in ANY book
//books.forEach will scan every book.
//Within everybook, the second forEach() will scan all the ID inside borrow.
//If each borrow ID match with the account ID, the count will increase by 1.
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => borrow.id === account.id && total++));
  return total;
}

/*Return information of the book and author that is currently rented out by the given account.
Make sure to put authors object inside the book object.
First: Loop through each book to check which book the person of interest currently have.
In each book scan through all the id to see if it match the current id and the return value is false
Push the targeted books into an array.
Second: Loop through all the books in the array
Find the author that match with the authorID that is in each book of interest
Embedded the author information into the respective book*/
function getBooksPossessedByAccount(account, books, authors) {
  let notReturned = [];
  books.forEach(book => {
    if (book.borrows.find(who => who.id === account.id && !who.returned)) {
      notReturned.push(book);
    }
  })
  notReturned.forEach(book =>{
    let writer = authors.find(author => author.id === book.authorId);
    book["author"] = writer;
  })
  return notReturned;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
