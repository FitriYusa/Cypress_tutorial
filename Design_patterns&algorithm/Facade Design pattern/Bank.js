//Create am accounts module using the revealin module pattern
const accounts = (function () {
    //define an array to store account information
    const accounts = [];

    return {
        //get account by name
        getAccountByName(name) {
            return accounts.find((a) => a.name === name);
        },

        //create a new account with a name and opening balance
        createAccount(name, openingBalance) {
            const account = {
                accountId: accounts.length + 1,
                name,
                amount: openingBalance,
            };

            //add the new account to the account array
            accounts.push(account);
            return account;
        }
    }
})();

//create a loans department module using the revealing module pattern
const loansDepartment = (function () {
    //define an array to store loan information
    const loans = [];

    return {
        //Check if a loan exist for a given accountId
        creditCheck(accountId){
            const existingLoan = loans.filter((loan) => loan.accountId === accountId);
            console.log({existingLoan});
            return existingLoan.length > 0;
        },

        //create a new loan for a given accountID and amount
        createLoan(accountId,amount) {
            const loan = {accountId, amount};

            //add new loan to the loan array
            loans.push(loan);
            return loan;
        }
    }
})();

//build a facade that can create an account and take a loan in a single function
const bankFacade = (function () {
    return {
        //create a loan for a person with a given name and amount
        createLoan(name,amount) {
            let account = accounts.getAccountByName(name);

            //check if the person has an existing loan and reject if credit is not good
            if(account && loansDepartment.creditCheck(account.accountId)) {
                throw new Error ("Your credit bad");
            }

            //if the person doenst have and account, create a new one
            if(!account) {
                account = accounts.createAccount(name, 0);
                console.log("Creatted new account", account);
            }

            //create a new loan for the person accountId and amount
            return loansDepartment.createLoan(account.accountId, amount);
        },
    };
})();

//create loans using the bankFacade and log the results
console.log(bankFacade.createLoan)("tom", 500);
console.log(bankFacade.createLoan)("tam", 500);