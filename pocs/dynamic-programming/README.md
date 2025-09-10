# Dynamic Programming POC

This project is a simple **Proof of Concept (POC)** to demonstrate **Dynamic Programming** using two classic problems:

1. **Fibonacci Sequence**
   - Naive recursion (slow)
   - Memoization (Top-Down DP)
   - Tabulation (Bottom-Up DP)

2. **Coin Change Problem**
   - Find the minimum number of coins needed to reach a given amount.

## 🧠 What is Dynamic Programming?

Dynamic Programming (DP) is a powerful algorithmic technique used to solve complex problems by breaking them down into simpler subproblems. It's particularly effective when:

1. **Overlapping Subproblems**: The same subproblems are solved multiple times.
2. **Optimal Substructure**: The optimal solution to the problem can be constructed from optimal solutions of its subproblems.

### Key Concepts:

- **Memoization (Top-Down)**: Solve the problem recursively but store the results of subproblems to avoid redundant calculations.
- **Tabulation (Bottom-Up)**: Solve all possible subproblems iteratively and build up to the final solution.

### When to Use Dynamic Programming:

- Optimization problems (finding maximum/minimum values)
- Counting problems (finding the number of ways to do something)
- Problems with recursive solutions that have exponential time complexity

### Common Applications:

- Sequence alignment (DNA matching)
- Resource allocation
- Shortest path algorithms
- Text justification
- Game theory

Dynamic Programming trades memory for speed by storing intermediate results, making it possible to solve problems that would otherwise be computationally infeasible.

---

## 🛠️ Setup & Run

1. Clone or create the project folder:
   ```bash
   mkdir dp-poc && cd dp-poc
   ```

2. Add the files (index.js, test.js, package.json, README.md) or copy from this repo.

3. Install dependencies (none needed, just init Node):
   ```bash
   npm install
   ```

4. Run the tests:
   ```bash
   npm test
   ```

## 📊 Example Output
```
=== Fibonacci Tests ===
Naive(10): 55
Memo(50): 12586269025
Tab(50): 12586269025

=== Coin Change Tests ===
Coins [1,2,5], Amount 11 -> 3
Coins [2], Amount 3 -> -1
Coins [1,3,4], Amount 6 -> 2
```

## 📚 Learning Goals

- Show the difference between naive recursion and DP optimizations.
- Understand Top-Down (memoization) vs Bottom-Up (tabulation).
- Apply DP to a real-world problem (Coin Change).