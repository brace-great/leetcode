class dJSet {
  vals: number[];
  parents: number[];
  constructor(count: number) {
    this.vals = new Array(count + 1).fill(0).map((e, index) => index);
    this.parents = [...this.vals];
  }
  find(val) {
    if (this.parents[val] === val) {
      return val;
    }
    this.parents[val] = this.find(this.parents[val]);
    return this.parents[val];
  }
  isConnected(p, q) {
    return this.find(q) == this.find(p);
  }

  union(val1, val2) {
    let root1 = this.find(val1);
    let root2 = this.find(val2);
    if (root1 === root2) {
      return;
    }
    this.parents[root1] = root2;
  }
}
function biggestNum(a, b) {
  if (a < b) {
    let temp = a;
    a = b;
    b = temp;
  }
  while (b != 0) {
    let temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}
//785. 判断二分图 https://leetcode-cn.com/problems/is-graph-bipartite/
function isBipartite(graph: number[][]): boolean {
  const ds = new dJSet(graph.length);
  for (let i = 0; i < graph.length; i++) {
    if (graph[i].length >= 2) {
      for (let j = 0; j < graph[i].length - 1; j++) {
        ds.union(graph[i][j], graph[i][1 + j]);
      }
    }
  }
  for (let i = 0; i < graph.length; i++) {
    if (graph[i].length >= 1) {
      for (let j = 0; j < graph[i].length - 1; j++) {
        if (ds.isConnected(i, graph[i][j])) {
          return false;
        }
      }
    }
  }
  return true;
}
//839. 相似字符串组 https://leetcode-cn.com/problems/similar-string-groups/
function numSimilarGroups(strs: string[]): number {
  const len = strs.length;
  const nodeSet = new dJSet(len);
  const isSimilar = (str1: string, str2: string) => {
    if (str1 == str2) return true;
    let count = 0;
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        count++;
      }
    }
    return count === 2;
  };
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (isSimilar(strs[i], strs[j])) {
        nodeSet.union(i, j);
      }
    }
  }
  let count = 0;
  for (let i = 0; i < len; i++) {
    if (nodeSet.find(i) === i) {
      count++;
    }
  }
  return count;
}

//547. 省份数量 https://leetcode.cn/problems/number-of-provinces/
function findCircleNum(isConnected: number[][]): number {
  const len = isConnected.length;
  const nodeSet = new dJSet(len);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (isConnected[i][j] === 1) {
        nodeSet.union(i, j);
      }
    }
  }
  let count = 0;
  for (let i = 0; i < len; i++) {
    if (nodeSet.find(i) === i) {
      count++;
    }
  }
  return count;
}

//684. 冗余连接 https://leetcode-cn.com/problems/redundant-connection/
function findRedundantConnection(edges: number[][]): number[] {
  let len = edges.length;
  const nodeSet = new dJSet(len);
  for (let i = 0; i < len; i++) {
    let [val1, val2] = edges[i];
    if (nodeSet.find(val1) === nodeSet.find(val2)) {
      return edges[i];
    }
    nodeSet.union(val1, val2);
  }
  return [];
}
