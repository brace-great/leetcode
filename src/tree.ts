import { Map } from "typescript";
function addOneRow(
  root: TreeNode | null,
  val: number,
  depth: number
): TreeNode | null {
  let nowDepth;
  if (!root) return null;
  else nowDepth = 1;
  if (depth == 1) {
    let rs = new TreeNode();
    rs.val = val;
    rs.left = root;
    return rs;
  } else {
    let tem = [];
    let parent = [];
    tem.push([root, nowDepth]);
    while (tem.length) {
      let a = tem.pop();
      if (a[0].left) tem.push([a[0].left, a[1] + 1]);
      if (a[0].right) tem.push([a[0].right, a[1] + 1]);
      if (a[1] == depth - 1) parent.push(a[0]);
    }
    let sons = [];
    for (let i of parent) {
      if (i.left) sons.push(i.left);
      if (i.right) sons.push(i.right);
      let a = new TreeNode(val, i.left);
      let b = new TreeNode(val, null, i.right);
      i.left = a;
      i.right = b;
    }
    return root;
  }
}
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.right.left = new TreeNode(4);
root.right.right = new TreeNode(5);

//深度优先搜索带深度
function dfs2(root: TreeNode | null, path: {}, depth) {
  if (root === null) {
    return false;
  }
  if (!path[depth]) path[depth] = [];
  path[depth].push(root);
  dfs2(root.left, path, depth + 1);
  dfs2(root.right, path, depth + 1);
}
//深度优先搜索
function dfs(root: TreeNode | null, target: number, path): boolean {
  if (root === null) {
    return false;
  }
  path.push(root);
  if (root.val === target) {
    return true;
  }
  return dfs(root.left, target, path) || dfs(root.right, target, path);
}

//剑指 Offer 33. 二叉搜索树的后序遍历序列 https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-hou-xu-bian-li-xu-lie-lcof/
function verifyPostorder(postorder: number[]): boolean {
  const dfs = (postorder: number[], start: number, end: number): boolean => {
    if (start >= end) return true;
    let i = start;
    while (postorder[i] < postorder[end]) {
      i++;
    }
    for (let j = i; j < end; j++) {
      if (postorder[j] < postorder[end]) return false;
    }
    return dfs(postorder, start, i - 1) && dfs(postorder, i, end - 1);
  };
  return dfs(postorder, 0, postorder.length - 1);
}

//剑指 Offer 32 - III. 从上到下打印二叉树 III https://leetcode.cn/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/
function levelOrder2(root: TreeNode | null): number[][] {
  const rs = new Array(maxDepth(root));
  const dfs = (root: TreeNode | null, level: number) => {
    if (!root) return;
    if (!rs[level]) {
      rs[level] = [];
    }
    rs[level].push(root.val);
    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  };
  dfs(root, 0);
  return rs;
}

//104. 二叉树的最大深度 https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

//平衡二叉树 https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof/
function isBalanced(root: TreeNode | null): boolean {
  let rs = [0, 0];
  function dfs(node, k, index) {
    if (node) {
      rs[index] = Math.max(dfs(node.left, k + 1, index), rs[index]);
      rs[index] = Math.max(dfs(node.right, k + 1, index), rs[index]);
      return k;
    } else return k - 1;
  }
  dfs(root.left, 1, 0);
  dfs(root.right, 1, 1);
  return Math.abs(rs[0] - rs[1]) <= 1;
}

//剑指 Offer 32 - II. 从上到下打印二叉树 II https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  let uesd = {};
  let data = [];
  let count = 0;
  let queue = [root];
  function bfs(root, count) {
    if (!root) return;
    if (!uesd[count]) uesd[count] = [root.val];
    else uesd[count].push(root.val);
    count++;
    bfs(root.left, count);
    bfs(root.right, count);
  }
  bfs(root, count);
  data = [...Object.values(uesd)];
  return data;
}

//剑指 Offer 26. 树的子结构 https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  const dfs = (A: TreeNode | null, B: TreeNode | null): boolean => {
    if (!B) return true;
    if (!A) return false;
    return A.val === B.val && dfs(A.left, B.left) && dfs(A.right, B.right);
  };
  if (!A || !B) return false;
  return dfs(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}

/**力扣112 路径总和 https://leetcode-cn.com/problems/path-sum/
 */
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  const dfs = (root: TreeNode | null, targetSum: number): boolean => {
    if (root === null) {
      return false;
    }
    if (root.left === null && root.right === null) {
      return targetSum === root.val;
    }
    return (
      dfs(root.left, targetSum - root.val) ||
      dfs(root.right, targetSum - root.val)
    );
  };
  return dfs(root, targetSum);
}

//力扣剑指 Offer 07. 重建二叉树 https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof/
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  var process = (root, left, right) => {
    if (left > right) return null;
    let node: TreeNode = new TreeNode(preorder[root]); // 获取根结点
    let i = inorder.indexOf(preorder[root]); // 根结点在中序排序中index
    node.left = process(root + 1, left, i - 1); // 迭代左子树
    node.right = process(root + (i - left) + 1, i + 1, right); // 迭代右子树  （i - left） 左子树长度
    return node;
  };
  return process(0, 0, inorder.length - 1);
}
