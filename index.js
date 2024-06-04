import inquirer from "inquirer";
import chalk from "chalk";
let currentBalance = 40000;
let pinNumber = 3489;
console.log(chalk.blue("\n \tWelcome to the Bank - ATM Machine\n"));
let pinReply = await inquirer.prompt([
    {
        name: "PinNumber",
        type: "number",
        message: chalk.yellow("Enter your Pin Number:")
    }
]);
if (pinReply.PinNumber === pinNumber) {
    console.log(chalk.green("\nYou enter a Correct Pin Number.\n"));
    console.log(`Your Current Account Balance is: ${currentBalance}`);
    let operationReply = await inquirer.prompt([{
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationReply.operation === "Withdraw Amount") {
        let withdrawReply = await inquirer.prompt([{
                name: "withdrawMehod",
                type: "list",
                message: "Select a withdraw method:",
                choices: ["Fast Cash", "Enter Amount"]
            }]);
        if (withdrawReply.withdrawMethod === "Fast Cash") {
            let fastCashReply = await inquirer.prompt([{
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 50000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashReply.fasCash > currentBalance) {
                console.log("Insufficient Balance");
            }
            else {
                currentBalance -= fastCashReply.fastCash;
                console.log(`${fastCashReply.fastCash} withdraw Sucessfully`);
                console.log(`Your Remaining Balance is: ${currentBalance}`);
            }
        }
        let amountReply = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter the amount to withdraw"
            }
        ]);
        if (amountReply.amount > currentBalance) {
            console.log(chalk.red("Insufficient Balance"));
        }
        else {
            currentBalance -= amountReply.amount;
            console.log(`${amountReply.amount} Withdraw amount successfully`);
            console.log(`Your Remaining Balance is ${currentBalance}`);
        }
    }
    else if (operationReply.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${currentBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect. Try Again!"));
}
