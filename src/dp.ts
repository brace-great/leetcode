
//1155. 掷骰子的N种方法 https://leetcode-cn.com/problems/dice-roll-simulation/
function numRollsToTarget(n: number, k: number, target: number): number {
  const MOD = 1000000007;
  const dp = new Array(n+1).fill(0).map(() => new Array(target+1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= target; j++) {
      for (let t = 1; t <= k&&j>=t; t++) {
        dp[i][j] = (dp[i][j] + dp[i-1][j-t]) % MOD;
      }
    }
  }
  return  dp[n][target];
};

//322. 零钱兑换 https://leetcode-cn.com/problems/coin-change/
function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  coins.sort((a, b) => a - b);
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      } else break;
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

//416. 分割等和子集 https://leetcode-cn.com/problems/partition-equal-subset-sum/
function canPartition(nums: number[]): boolean {
  if (nums.length < 2) return false;
  const sum = nums.reduce((a, b) => a + b);
  if (sum % 2 !== 0) return false;
  const max = Math.max(...nums);
  if (max > sum / 2) return false;
  const target = sum / 2;
  const dp2 = new Array(target + 1).fill(false);
  dp2[0] = true;
  for (let i = 1; i < nums.length; i++) {
    for (let j = target; j >= 1; j--) {
      if (j >= nums[i]) {
        dp2[j] = dp2[j] || dp2[j - nums[i]];
      } else {
        dp2[j] = dp2[j];
      }
    }
  }
  return dp2[target];
}

//97. 交错字符串 https://leetcode-cn.com/problems/interleaving-string/
function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length != s3.length) return false;
  const dp: Array<Array<boolean>> = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(false));
  for (let i = 0; i <= s1.length; i++) {
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = true;
      } else if (i === 0) {
        dp[i][j] = dp[i][j - 1] && s2[j - 1] === s3[i + j - 1];
      } else if (j === 0) {
        dp[i][j] = dp[i - 1][j] && s1[i - 1] === s3[i + j - 1];
      } else {
        dp[i][j] =
          (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
          (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
      }
    }
  }
  return dp[s1.length][s2.length];
}
//1143. 最长公共子序列 https://leetcode-cn.com/problems/longest-common-subsequence/
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = new Array(text1.length + 1)
    .fill(0)
    .map(() => new Array(text2.length + 1).fill(0));
  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[text1.length][text2.length];
}

//132. 分割回文串 II https://leetcode-cn.com/problems/palindrome-partitioning-ii/
function minCut(s: string): number {
  const check = (s: string) => {
    if (!s) return false;
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      if (s[left] != s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  };
  const dp = new Array(s.length).fill(0);
  for (let i = 1; i < s.length; i++) {
    let min = s.length;
    if (!check(s.slice(0, i + 1))) {
      for (let j = 1; j <= i; j++) {
        if (check(s.slice(j, i + 1))) {
          min = Math.min(min, dp[j - 1] + 1);
        }
      }
      dp[i] = min;
    }
  }
  return dp[s.length - 1];
}
//873. 最长的斐波那契子序列的长度 https://leetcode-cn.com/problems/longest-fibonacci-subsequence/
function lenLongestFibSubseq(arr: number[]): number {
  const dp = new Array(arr.length)
    .fill(0)
    .map(() => new Array(arr.length).fill(0));
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = 0; k < i; k++) {
        if (arr[i] + arr[k] === arr[j]) {
          if (dp[k][i] === 0) {
            dp[k][i] = 2;
          }
          dp[i][j] = dp[k][i] + 1;
          max = Math.max(max, dp[i][j]);
        }
      }
    }
  }
  return max;
}
//746. 使用最小花费爬楼梯 https://leetcode-cn.com/problems/min-cost-climbing-stairs/
function minCostClimbingStairs(cost: number[]): number {
  let dp: number[] = new Array(cost.length);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return Math.min(dp[cost.length - 1], dp[cost.length - 2]);
}
//剑指 Offer 60. n个骰子的点数 https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof/
function dicesProbability(n: number): number[] {
  let m = new Map();
  for (let i = 1; i <= n; i++) {
    if (i === 1) {
      m.set(i, [1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6, 1 / 6]);
    } else {
      let pre = m.get(i - 1);
      let cur = new Array(5 * i + 1).fill(0);
      for (let j = 0; j < 6; j++) {
        for (let p = 0; p < pre.length; p++) {
          cur[p + j] += (1 / 6) * pre[p];
        }
      }
      m.set(i, cur);
    }
  }
  return m.get(n);
}
dicesProbability(3);
//剑指 Offer 46. 把数字翻译成字符串 https://leetcode-cn.com/problems/ba-shu-zi-fan-yi-cheng-zi-fu-chuan-lcof/
function translateNum(num: number): number {
  const numS = num.toString();
  const len = numS.length;
  let dp = new Array(len).fill(0);
  dp[0] = 1;
  if (len >= 2) {
    if (parseInt(numS.slice(0, 2)) < 26) {
      dp[1] = 2;
    } else {
      dp[1] = 1;
    }
  } else {
    return 1;
  }
  for (let i = 2; i < len; i++) {
    if (numS[i - 1] != "0" && parseInt(numS.slice(i - 1, i + 1)) < 26) {
      dp[i] = dp[i - 1] + dp[i - 2];
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[len - 1];
}

//3. 无重复字符的最长子串 https://leetcode-cn.com/problems/length-of-longest-substring/
function lengthOfLongestSubstring(s: string): number {
  const dp = [];
  dp.push(s[0]);
  for (let i = 1; i < s.length; i++) {
    if (!dp[i - 1].includes(s[i])) {
      dp.push(dp[i - 1] + s[i]);
    } else {
      let tem: string = dp[i - 1];
      tem = tem.slice(tem.indexOf(s[i]) + 1);
      dp.push(tem + s[i]);
    }
  }
  const rs = dp.map((item) => item.length);
  return Math.max(...rs);
}

//力扣264. 丑数 II https://leetcode-cn.com/problems/ugly-number-ii/
function nthUglyNumber(n: number): number {
  let i = 0;
  let j = 0;
  let k = 0;
  let nums = [1];
  while (nums.length < n) {
    let min = Math.min(nums[i] * 2, nums[j] * 3, nums[k] * 5);
    if (min === nums[i] * 2) i++;
    if (min === nums[j] * 3) j++;
    if (min === nums[k] * 5) k++;
    nums.push(min);
  }
  return nums[n - 1];
}

//剑指 Offer 13. 机器人的运动范围 https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
function movingCount(m: number, n: number, k: number): number {
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(-1));
  let count = 0;
  function shuweihe(num: number) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }
  function analyze(i: number, j: number, k: number, dp: number[][]) {
    if (i < 0 || j < 0 || i >= m || j >= n || dp[i][j] !== -1) return;
    if (shuweihe(i) + shuweihe(j) > k) {
      dp[i][j] = 0;
    } else {
      dp[i][j] = 1;
      analyze(i - 1, j, k, dp);
      analyze(i, j - 1, k, dp);
      analyze(i + 1, j, k, dp);
      analyze(i, j + 1, k, dp);
    }
  }
  analyze(0, 0, k, dp);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dp[i][j] === 1) {
        count += 1;
      }
    }
  }
  return count;
}

//剑指 Offer 14- II. 剪绳子 II https://leetcode-cn.com/problems/jian-sheng-zi-ii-lcof/
function cuttingRope(n: number): number {
  const MOD = BigInt(1e9 + 7);
  var cuttingRope2 = function (n) {
    let dp = new Array(n).fill(BigInt(1));
    for (let i = 0; i < n; i++) {
      for (let j = i - 1; j >= 0; j--) {
        dp[i] = max(dp[i], dp[j] * BigInt(i - j), BigInt((j + 1) * (i - j)));
      }
    }
    return dp[n - 1] % MOD;
  };

  const max = (...args) =>
    args.reduce((prev, curr) => (prev > curr ? prev : curr));
  return Number(cuttingRope2(n));
}

//力扣122. 买卖股票的最佳时机 II https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/
function maxProfit2(prices: number[]): number {
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      maxProfit += prices[i] - prices[i - 1];
    }
  }
  return maxProfit;
}

//力扣714. 买卖股票的最佳时机含手续费 https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
function maxProfitWithFee(prices: number[], fee: number): number {
  const dp: number[][] = new Array(2)
    .fill(0)
    .map(() => new Array(prices.length).fill(0));
  dp[0][0] = 0;
  dp[1][0] = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    dp[1][i] = Math.max(dp[1][i - 1], dp[0][i - 1] - prices[i]);
    dp[0][i] = Math.max(dp[0][i - 1], dp[1][i - 1] + prices[i] - fee);
  }
  return Math.max(dp[0][prices.length - 1], dp[1][prices.length - 1]);
}

//力扣518. 零钱兑换 II https://leetcode-cn.com/problems/coin-change-2/
function change(amount: number, coins: number[]): number {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }
  return dp[amount];
}

//力扣63. 不同路径 II https://leetcode-cn.com/problems/unique-paths-ii/
function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else if (i > 0 && j > 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      } else if (i > 0) {
        dp[i][j] = dp[i - 1][j];
      } else if (j > 0) {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
}

//力扣300. 最长递增子序列 https://leetcode.cn/problems/longest-increasing-subsequence/
function lengthOfLIS(nums: number[]): number {
  //从前向后遍历
  const dp: number[] = [];
  // dp[0] = 1
  let result: number;
  for (let i = 0; i < nums.length; i++) {
    dp[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  // console.log(dp)
  result = Math.max(...dp);
  return result;
}
//力扣516. 最长回文子序列  https://leetcode-cn.com/problems/longest-palindromic-subsequence/
function longestPalindromeSubseq(s: string): number {
  const dp: number[][] = [];
  for (let i = 0; i <= s.length; i++) {
    dp[i] = [];
    for (let j = 0; j < s.length; j++) {
      dp[i][j] = 0;
    }
  }
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = 1;
  }
  for (let gap = 1; gap < s.length; gap++) {
    for (let i = s.length - 1; i - gap >= 0; i--) {
      let j = i - gap;
      if (s[i] === s[j]) {
        dp[j][i] = dp[j + 1][i - 1] + 2;
      } else {
        dp[j][i] = Math.max(dp[j + 1][i], dp[j][i - 1]);
      }
    }
  }
  return dp[0][s.length - 1];
}

//力扣121. 买卖股票的最佳时机 https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
function maxProfit(prices: number[]): number {
  const dp: number[] = [];
  dp[0] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i] = Math.max(dp[i - 1], prices[i] - Math.min(...prices.slice(0, i)));
  }
  return dp[prices.length - 1];
}
//力扣198. 打家劫舍 https://leetcode-cn.com/problems/house-robber/
function rob(nums: number[]): number {
  const dp: number[] = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }
  return dp[nums.length - 1];
}

//力扣62. 不同路径 https://leetcode-cn.com/problems/unique-paths/
function uniquePaths(m: number, n: number): number {
  const dp: number[][] = [];
  for (let i = 0; i < m; i++) {
    dp[i] = [];
    for (let j = 0; j < n; j++) {
      dp[i][j] = 0;
    }
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1;
  }
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}

//力扣64. 最小路径和 https://leetcode-cn.com/problems/minimum-path-sum/
function minPathSum(grid: number[][]): number {
  const dp = new Array(grid.length)
    .fill(0)
    .map(() => new Array(grid[0].length).fill(0));
  dp[0][0] = grid[0][0];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i == 0 && j == 0) continue;
      if (i == 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else if (j == 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }
  }
  return dp[grid.length - 1][grid[0].length - 1];
}
