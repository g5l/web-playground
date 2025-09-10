const { fibNaive, fibMemo, fibTab, coinChange } = require("./index");

// Fibonacci
console.log("=== Fibonacci Tests ===");
console.log("Naive(10):", fibNaive(10));      // 55
console.log("Memo(50):", fibMemo(50));        // 12586269025
console.log("Tab(50):", fibTab(50));          // 12586269025

// Coin Change
console.log("\n=== Coin Change Tests ===");
console.log("Coins [1,2,5], Amount 11 ->", coinChange([1, 2, 5], 11)); // 3
console.log("Coins [2], Amount 3 ->", coinChange([2], 3));             // -1
console.log("Coins [1,3,4], Amount 6 ->", coinChange([1, 3, 4], 6));   // 2
