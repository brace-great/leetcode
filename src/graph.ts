//剑指 Offer II 115. 重建序列 https://leetcode.cn/problems/ur2n8P/
function sequenceReconstruction(
  nums: number[],
  sequences: number[][]
): boolean {
  const inDegree = new Map<number, Set<number>>();
  const outDegree = new Map();
  for (const sequence of sequences) {
    for (let i = 1; i < sequence.length; i++) {
      const [pre, cur] = [sequence[i - 1], sequence[i]];
      if (!inDegree.has(cur)) {
        inDegree.set(cur, new Set());
      }
      if (!outDegree.has(pre)) {
        outDegree.set(pre, new Set());
      }
      inDegree.get(cur).add(pre);
      outDegree.get(pre).add(cur);
    }
  }
  const queue = [];
  for (let i = 1; i <= nums.length; i++) {
    if (!inDegree.has(i)) {
      queue.push(i);
    }
  }
  const res = [];
  while (queue.length) {
    if (queue.length > 1) return false;
    const cur = queue.shift();
    res.push(cur);
    const curOuts = outDegree.get(cur);
    if (curOuts) {
      for (const curOut of curOuts) {
        inDegree.get(curOut).delete(cur);
        if (!inDegree.get(curOut).size) {
          queue.push(curOut);
        }
      }
    }
  }
  let rs = true;
  for (let i = 0; i < res.length; i++) {
    if (res[i] !== nums[i]) {
      rs = false;
    }
  }
  return rs;
}

//210. 课程表 II https://leetcode-cn.com/problems/course-schedule-ii/
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const inDegree = new Map();
  const outDegree = new Map();
  for (const [course, prereq] of prerequisites) {
    if (!inDegree.has(course)) {
      inDegree.set(course, []);
    }
    if (!outDegree.has(prereq)) {
      outDegree.set(prereq, []);
    }
    inDegree.get(course).push(prereq);
    outDegree.get(prereq).push(course);
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (!inDegree.has(i)) {
      queue.push(i);
    }
  }
  const res = [];
  while (queue.length) {
    const course = queue.shift();
    res.push(course);
    const out = outDegree.get(course);
    if (out) {
      for (const prereq of out) {
        inDegree.get(prereq).splice(inDegree.get(prereq).indexOf(course), 1);
        if (!inDegree.get(prereq).length) {
          queue.push(prereq);
        }
      }
    }
  }
  return res.length === numCourses ? res : [];
}

//力扣207课程表 https://leetcode.cn/problems/course-schedule/
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map<number, Set<number>>();
  for (const [course, prereq] of prerequisites) {
    if (!graph.has(course)) {
      graph.set(course, new Set());
    }
    graph.get(course).add(prereq);
  }
  const visited = new Set();
  const visiting = new Set();
  for (let i = 0; i < numCourses; i++) {
    if (isCircle(i)) return false;
  }
  function isCircle(course: number) {
    if (visited.has(course)) return false;
    if (visiting.has(course)) return true;
    visiting.add(course);
    if (graph.has(course)) {
      for (const prereq of graph.get(course)) {
        if (isCircle(prereq)) return true;
      }
    }
    visiting.delete(course);
    visited.add(course);
    return false;
  }
  return true;
}

//力扣200 岛屿数量 https://leetcode-cn.com/problems/number-of-islands/
function numIslands(grid: string[][]): number {
  const visited = [];
  grid.forEach((element) => {
    visited.push([]);
    let index = 0;
    element.forEach((element2) => {
      visited[index].push(false);
    });
    index++;
  });
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "1" && !visited[i][j]) {
        dfs(grid, i, j, visited);
        count++;
      }
    }
  }
  function dfs(grid: string[][], i: number, j: number, visited: boolean[][]) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length) {
      return;
    }
    if (grid[i][j] === "0" || visited[i][j]) {
      return;
    }
    visited[i][j] = true;
    dfs(grid, i + 1, j, visited);
    dfs(grid, i - 1, j, visited);
    dfs(grid, i, j + 1, visited);
    dfs(grid, i, j - 1, visited);
  }
  return count;
}

/**力扣690 员工的重要度 https://leetcode-cn.com/problems/employee-importance/
 * Definition for Employee.
 */

class Employee {
  id: number;
  importance: number;
  subordinates: number[];
  constructor(id: number, importance: number, subordinates: number[]) {
    this.id = id === undefined ? 0 : id;
    this.importance = importance === undefined ? 0 : importance;
    this.subordinates = subordinates === undefined ? [] : subordinates;
  }
}

function getImportance(employees: Employee[], id: number): number {
  const map = new Map<number, Employee>();
  for (const employee of employees) {
    map.set(employee.id, employee);
  }
  let sum = 0;
  function dps(employee: Employee) {
    sum += employee.importance;
    for (const subordinate of employee.subordinates) {
      dps(map.get(subordinate));
    }
    return sum;
  }
  return dps(map.get(id));
}

//剑指 Offer 12. 矩阵中的路径 https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof/
function exist(board: string[][], word: string): boolean {
  function dfs(i: number, j: number, index: number): boolean {
    if (index === word.length) {
      return true;
    }
    if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) {
      return false;
    }
    if (board[i][j] !== word[index]) {
      return false;
    }
    board[i][j] = "";
    const res =
      dfs(i + 1, j, index + 1) ||
      dfs(i - 1, j, index + 1) ||
      dfs(i, j + 1, index + 1) ||
      dfs(i, j - 1, index + 1);
    board[i][j] = word[index];
    return res;
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}

//力扣剑指 Offer 38. 字符串的排列 https://leetcode.cn/problems/zi-fu-chuan-de-pai-lie-lcof/
function permutation(s: string): string[] {
  const res = new Set();
  const dfs = (s: string, path: string[]): void => {
    if (s.length === 0) {
      res.add(path.join(""));
      return;
    }
    for (let i = 0; i < s.length; i++) {
      dfs(s.slice(0, i) + s.slice(i + 1), [...path, s[i]]);
    }
  };
  dfs(s, []);
  return Array.from(res) as string[];
}

//力扣51. N 皇后 https://leetcode-cn.com/problems/n-queens/
function solveNQueens(n: number): string[][] {
  if (n < 1) return [];
  const result: number[][] = [];
  const [cols, pie, na] = new Array(3)
    .fill(0)
    .map((value) => new Set<number>());
  function DFS(n: number, row: number, curState: number[]) {
    if (row >= n) {
      result.push(curState);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || pie.has(row + col) || na.has(row - col)) {
        continue;
      }
      cols.add(col);
      pie.add(row + col);
      na.add(row - col);
      DFS(n, row + 1, [...curState, col]);
      cols.delete(col);
      pie.delete(row + col);
      na.delete(row - col);
    }
  }
  function generateResult(n: number) {
    const board: string[][] = [];
    for (const res of result) {
      const temp: string[] = [];
      for (const i of res) {
        temp.push(`${".".repeat(i)}${"Q"}${".".repeat(n - i - 1)}`);
      }
      board.push(temp);
    }
    return board;
  }
  DFS(n, 0, []);
  return generateResult(n);
}
