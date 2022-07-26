//js代理/拦截器例子
const user = {
  firstName: "John",
  lastName: "Doe",
};

const getFullName = function (user) {
  return `${user.firstName} ${user.lastName}`;
};

const getFullNameProxy = new Proxy(getFullName, {
  apply(target, thisArg, args: any) {
    //@ts-ignore
    return target(...args).toUpperCase();
  },
});

//发布订阅
class EventEmitter {
  subscriptions = new Map();

  subscribe(eventName, callback) {
    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, new Set());
    }
    const subscriptions = this.subscriptions.get(eventName);
    const callbackObj = { callback };
    subscriptions.add(callbackObj);

    return {
      release: () => {
        subscriptions.delete(callbackObj);
        if (subscriptions.size === 0) {
          subscriptions.delete(eventName);
        }
      },
    };
  }

  emit(eventName, ...args) {
    const subscriptions = this.subscriptions.get(eventName);
    if (subscriptions) {
      subscriptions.forEach((cbObj) => {
        cbObj.callback.apply(this, args);
      });
    }
  }
}

//读取控制台输入
import * as readline from "readline";
function rlExample() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Is this example useful? [y/n] ", (answer) => {
    switch (answer.toLowerCase()) {
      case "y":
        console.log("Super!");
        break;
      case "n":
        console.log("Sorry! :(");
        break;
      default:
        console.log("Invalid answer!");
    }
    rl.close();
  });
}
//猜数字游戏
function bagels() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let rs = randomInt(100, 999).toString();
  function judge(n: string) {
    for (let i = 0; i < n.length; i++) {
      if (n[i] == rs[i]) {
        return "Fermi";
      }
    }
    let count = 0;
    for (let i = 0; i < n.length; i++) {
      if (rs.includes(n[i])) {
        count++;
      }
    }
    if (count) return "Pico";
    else return "Bagels";
  }
  let cb = (answer) => {
    switch (answer.toLowerCase()) {
      case rs:
        console.log("right!");
        rl.close();
        break;
      default:
        console.log(judge(answer));
        core();
        break;
    }
  };
  let core = () => {
    rl.question("lets guess:", cb);
  };
  core();
}

//生成从minNum到maxNum的随机数
function randomInt(minNum, maxNum) {
  var random = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  return random;
}
//373. 查找和最小的 K 对数字 https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/
var kSmallestPairs = function (nums1, nums2, k) {
  let m = nums1.length,
    n = nums2.length;
  // 记录每个位置的指针，索引从0开始
  let dp = new Array(Math.min(m, k)).fill(0);
  let result = [];

  while (result.length < k) {
    let minIndex = -1,
      minValue = Number.MAX_VALUE;
    for (let i = 0; i < dp.length; i++) {
      if (dp[dp.length - 1] == n) {
        return result;
      }
      if (dp[i] == n) continue;
      let sum = nums1[i] + nums2[dp[i]];
      if (sum < minValue) {
        minValue = sum;
        minIndex = i;
      }
      if (dp[i] == 0) break;
    }
    result.push([nums1[minIndex], nums2[dp[minIndex]]]);
    dp[minIndex]++;
  }

  return result;
};

//318. 最大单词长度乘积 https://leetcode-cn.com/problems/maximum-product-of-word-lengths/
var maxProduct = function (words) {
  let map = new Map();
  for (let w of words) {
    let bit = 0;
    for (let s of w) {
      bit |= 1 << (s.charCodeAt(0) - "a".charCodeAt(0));
    }
    const wordMaxLen = map.has(bit)
      ? Math.max(map.get(bit), w.length)
      : w.length;
    map.set(bit, wordMaxLen);
  }
  let max = 0;
  for (let [i, vi] of map) {
    for (let [j, vj] of map) {
      if ((i & j) == 0) max = Math.max(max, vi * vj);
    }
  }
  return max;
};

//剑指 Offer 约瑟夫环 62. 圆圈中最后剩下的数字 https://leetcode.cn/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/
function lastRemaining(n: number, m: number): number {
  let rs = 0;
  for (let i = 2; i <= n; i++) {
    rs = (rs + m) % i;
  }
  return rs;
}

//剑指 Offer 45. 把数组排成最小的数 https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
function minNumber(nums: number[]): string {
  return nums
    .sort((a, b) => {
      if ("" + a + b < "" + b + a) return -1;
      else return 1;
    })
    .join("");
}

//力扣剑指 Offer 29. 顺时针打印矩阵 https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/
function spiralOrder(matrix: number[][]): number[] {
  if (!matrix.length || !matrix[0].length) return [];

  let left = 0,
    right = matrix[0].length - 1,
    top = 0,
    bottom = matrix.length - 1,
    result = [];

  while (true) {
    // 从左到右，以 left 开始，right 结束
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    if (++top > bottom) break; // 该行遍历完，向下移动一行，如果上边边界大于下边边界了，遍历完成，跳出

    // 从上到下遍历，以 top 开始，bottom结束
    for (let j = top; j <= bottom; j++) result.push(matrix[j][right]);
    if (--right < left) break; // 该列遍历完，向左移动一行，如果右边边界小于左边边界了，遍历完成，跳出

    // 从右到左遍历，以 right 开始，left 结束
    for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
    if (--bottom < top) break; // 该行遍历完，向上移动一行，如果下边边界小于上边边界了，遍历完成，跳出

    // 从下到上遍历，以 bottom 开始，top 结束
    for (let j = bottom; j >= top; j--) result.push(matrix[j][left]);
    if (++left > right) break; // 该列遍历完，向右移动一行，如果左边边界大于右边边界了，遍历完成，跳出
  }

  return result;
}

//力扣191. 位1的个数 https://leetcode-cn.com/problems/number-of-1-bits/
function hammingWeight(n: number): number {
  let a = n.toString(2);
  const matches = a.matchAll(/1/g);
  let rs = 0;
  for (const i of matches) {
    rs++;
  }
  return rs;
}

// 剑指 Offer 04. 二维数组中的查找 https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
function searchMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0) {
    return false;
  }
  if (matrix[0][0] > target) {
    return false;
  }
  let row = [0, matrix.length - 1];
  let col = [0, matrix[0].length - 1];
  if (matrix[row[1]][col[1]] < target) {
    return false;
  }
  for (let i = row[0]; i <= row[1]; i++) {
    for (let j = col[1]; j >= col[0]; j--) {
      if (matrix[i][j] === target) {
        return true;
      } else if (matrix[i][j] < target) {
        row[0] = i + 1;
        continue;
      } else {
        col[1] = j - 1;
      }
    }
  }
  for (let i = row[1]; i >= row[0]; i--) {
    for (let j = col[0]; j <= col[1]; j++) {
      if (matrix[i][j] === target) {
        return true;
      } else if (matrix[i][j] > target) {
        row[1] = i - 1;
        continue;
      } else {
        col[0] = j + 1;
      }
    }
  }
  return false;
}

// 力扣42接雨水 https://leetcode-cn.com/problems/trapping-rain-water/
function trap(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let sum = 0;
  let min = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      min = Math.max(min, height[left]);
      sum += min - height[left];
      left++;
    } else {
      min = Math.max(min, height[right]);
      sum += min - height[right];
      right--;
    }
  }
  return sum;
}

//剑指 Offer II 003. 前 n 个数字二进制中 1 的个数 https://leetcode.cn/problems/w3tCBm/
function countBits(n: number): number[] {
  let rs = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let temp = i.toString(2);
    let count = 0;
    for (let j = 0; j < temp.length; j++) {
      if (temp[j] === "1") {
        count++;
      }
    }
    rs[i] = count;
  }
  return rs;
}
