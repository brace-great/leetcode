class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  show = function () {
    console.log(this.data);
  };
}

class Tree {
  constructor(node) {
    this.root = node;
  }
  insert = (data) => {
    var node = new Node(data, null, null);
    if (!this.root) {
      this.root = node;
      return;
    }
    var current = this.root;
    var parent = null;
    while (current) {
      parent = current;
      if (data < parent.data) {
        current = current.left;
        if (!current) {
          parent.left = node;
          return;
        }
      } else {
        current = current.right;
        if (!current) {
          parent.right = node;
          return;
        }
      }
    }
  };
  preOrder = function (node = this.root) {
    if (node) {
      node.show();
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  };
  middleOrder = function (node = this.root) {
    if (node) {
      this.middleOrder(node.left);
      node.show();
      this.middleOrder(node.right);
    }
  };
  laterOrder = function (node = this.root) {
    if (node) {
      this.laterOrder(node.left);
      this.laterOrder(node.right);
      node.show();
    }
  };
  getMin = function () {
    var current = this.root;
    while (current) {
      if (!current.left) {
        return current;
      }
      current = current.left;
    }
  };
  getMax = function () {
    var current = this.root;
    while (current) {
      if (!current.right) {
        return current;
      }
      current = current.right;
    }
  };
  getDeep = function (node = this.root, deep) {
    deep = deep || 0;
    if (node == null) {
      return deep;
    }
    deep++;
    var dleft = this.getDeep(node.left, deep);
    var dright = this.getDeep(node.right, deep);
    return Math.max(dleft, dright);
  };
  getNode = function (data, node = this.root) {
    if (node) {
      if (data === node.data) {
        return node;
      } else if (data < node.data) {
        return this.getNode(data, node.left);
      } else {
        return this.getNode(data, node.right);
      }
    } else {
      return null;
    }
  };
}

//中序遍历迭代式
function inOrder(node) {
  var stack = [];
  var current = node;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current.show();
    current = current.right;
  }
}
//前中序重建二叉树
function reConstructBinaryTree(pre, vin) {
  if (pre.length == 0) {
    return null;
  }
  var root = new Node(pre[0]);
  var index = vin.indexOf(pre[0]);
  var left = vin.slice(0, index);
  var right = vin.slice(index + 1);
  root.left = reConstructBinaryTree(pre.slice(1, left.length + 1), left);
  root.right = reConstructBinaryTree(pre.slice(left.length + 1), right);
  return root;
}
//转双向链表
function convert(pRootOfTree) {
  if (!pRootOfTree) {
    return null;
  }
  convertCore(pRootOfTree);
  while (pRootOfTree.left) {
    pRootOfTree = pRootOfTree.left;
  }
  return pRootOfTree;
}
function convertCore(node, last) {
  if (node.left) {
    last = convertCore(node.left, last);
  }
  node.left = last;
  if (last) {
    last.right = node;
  }
  last = node;
  if (node.right) {
    last = convertCore(node.right, last);
  }
  return last;
}

// var t = new Tree();

// t.insert(6);
// t.insert(0);
// t.insert(5);
// t.insert(7);
// t.insert(2);
// t.insert(1);
// t.insert(3);
// t.insert(8);
// t = convert(t.root);
// console.log(t);
// console.log(t);
// inOrder(t.root);
// t.preOrder(t.root);
// t.middleOrder();
// t.laterOrder(t.root);

//测试重建
// var pre = [1, 2, 4, 7, 3, 5, 6, 8];
// var vin = [4, 7, 2, 1, 5, 3, 8, 6];
// var root = reConstructBinaryTree(pre, vin);
// var t = new Tree(root);
// t.middleOrder();
