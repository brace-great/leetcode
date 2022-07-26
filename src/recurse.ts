import { TreeNode } from "./tree";

//带缓存斐波拉契
function feibo() {
  let cache = [];
  return function core(n) {
    if (n == 1 || n == 0) return n;
    cache[n - 1] = cache[n - 1] || core(n - 1);
    cache[n - 2] = cache[n - 2] || core(n - 2);
    return cache[n - 1] + cache[n - 2];
  };
}

//93. 复原 IP 地址 https://leetcode-cn.com/problems/restore-ip-addresses/
function restoreIpAddresses(s: string): string[] {
  const check = (str: string) => {
    if (!str || (str.length > 1 && str[0] == "0")) return false;
    let n = parseInt(str);
    if (n <= 255 && n >= 0) return true;
    return false;
  };
  const rs: Set<string> = new Set();
  const track = [];
  const backtrack = (start: number) => {
    if (track.length && !check(track[track.length - 1])) return;
    if (track.length == 4 && track.join("").length == s.length)
      return rs.add([...track].join("."));
    let gap = 1;
    for (let i = start; gap <= 3; gap++) {
      track.push(s.slice(i, i + gap));
      backtrack(i + gap);
      track.pop();
    }
  };
  backtrack(0);
  return Array.from(rs);
}
//131. 分割回文串 https://leetcode-cn.com/problems/palindrome-partitioning/
function partition(s: string): string[][] {
  const check = (str: string) => {
    if (!str) return false;
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
      if (str[left] != str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };
  const rs = [];
  const track = [];
  const backtrack = (start: number) => {
    if (track.length && !check(track[track.length - 1])) return;
    if (track.join("").length == s.length) return rs.push([...track]);
    let gap = 1;
    for (let i = start; i + gap <= s.length; gap++) {
      track.push(s.slice(i, i + gap));
      backtrack(i + gap);
      track.pop();
    }
  };
  backtrack(0);
  return rs;
}

//22. 括号生成 https://leetcode-cn.com/problems/generate-parentheses/
function generateParenthesis(n: number): string[] {
  const res: string[] = [];
  const dfs = (left: number, right: number, str: string): void => {
    if (left > right) {
      return;
    }
    if (left === 0 && right === 0) {
      res.push(str);
    }
    if (left > 0) {
      dfs(left - 1, right, str + "(");
    }
    if (right > 0) {
      dfs(left, right - 1, str + ")");
    }
  };
  dfs(n, n, "");
  return res;
}

//47. 全排列 II https://leetcode-cn.com/problems/permutations-ii/
function permuteUnique(nums: number[]): number[][] {
  const rs = [];
  const track = [];
  const used = new Array(nums.length).fill(0);
  const backtrack = (arr) => {
    if (track.length == arr.length) return rs.push([...track]);
    for (let i = 0; i < arr.length; i++) {
      if (used[i] || (nums[i] == nums[i - 1] && !used[i - 1])) continue;
      track.push(arr[i]);
      used[i] = 1;
      backtrack(arr);
      track.pop();
      used[i] = 0;
    }
  };
  nums.sort((a, b) => a - b);
  backtrack(nums);
  return rs;
}

//46. 全排列 https://leetcode-cn.com/problems/permutations/
function permute(nums: number[]): number[][] {
  const rs = [];
  const track = [];
  const backtrack = (arr) => {
    if (track.length == arr.length) return rs.push([...track]);
    for (let i = 0; i < arr.length; i++) {
      if (track.includes(arr[i])) continue;
      track.push(arr[i]);
      backtrack(arr);
      track.pop();
    }
  };
  backtrack(nums);
  return rs;
}

//78. 子集 https://leetcode-cn.com/problems/subsets/
function subsets(nums: number[]): number[][] {
  const rs = [];
  function core(track: number[], start: number) {
    rs.push([...track]);
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i]);
      core(track, i + 1);
      track.pop();
    }
  }
  core([], 0);
  return rs;
}

//124. 二叉树中的最大路径和 https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/
function maxPathSum(root: TreeNode | null): number {
  if (!root) return 0;
  let rs = -Infinity;
  const core = (root: TreeNode) => {
    if (!root) return 0;
    let leftVal = Math.max(0, core(root.left));
    let rightVal = Math.max(0, core(root.right));
    let rootVal = leftVal + rightVal + root.val;
    rs = Math.max(rs, rootVal);
    return Math.max(leftVal + root.val, rightVal + root.val);
  };
  core(root);
  return rs;
}
//297. 二叉树的序列化与反序列化 https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/
function serialize(root) {
  // 如果节点为空，使用一个特定的字符标识
  if (!root) {
    return "X";
  }

  // 每次递归都获取左右子树的序列化结果
  const left = serialize(root.left);
  const right = serialize(root.right);

  // 将当前二叉树按照根,左,右的方式拼接
  return `${root.val},${left},${right}`;
}

function deserialize(data) {
  // 将序列化的字符串，转换为数组
  const valList = data.split(",");

  // 生成二叉树的方法
  function build() {
    // 由于二叉树已经按照根、左、右的顺序序列化，每次递归只需要按顺序取出每个节点的值即可
    const val = valList.shift();

    // 如果当前值为X，表示此节点为空，直接返回null
    if (val === "X") {
      return null;
    }

    // 使用当前值生成一个节点
    const node = new TreeNode(val);

    // 由于子节点都是按照先左后右的顺序取出，因此按照同样顺序将子节点连接到根节点即可
    node.left = build();
    node.right = build();

    // 将当前生成的节点返回，供上一层递归生成树
    return node;
  }

  return build();
}

//剑指 Offer 16. 数值的整数次方 https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof/
function myPow(x: number, n: number): number {
  var myPow = function (x, n) {
    if (n === -1) return 1 / x;
    if (n === 0) return 1;
    if (n === 1) return x;
    if (n % 2 === 0) {
      return myPow(x * x, Math.floor(n / 2));
    } else {
      return myPow(x * x, Math.floor(n / 2)) * x;
    }
  };
  return myPow(x, n);
}

//剑指 Offer 10- I. 斐波那契数列 https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
function fib(n: number): number {
  const MOD = 1000000007;
  if (n == 0) return 0;
  function analyze(a, b, rsl, rsr) {
    if (b == n) {
      return rsr;
    }
    return analyze(a + 1, b + 1, rsr, (rsl + rsr) % MOD);
  }
  return analyze(0, 1, 0, 1);
}
