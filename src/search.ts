// 力扣69x的平方根 https://leetcode.cn/problems/sqrtx/
function mySqrt(x: number): number {
  if (x === 0 || x === 1) {
    return x;
  }
  let left = 1;
  let right = x;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid > x) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left - 1;
}

// 力扣374 猜数字 https://leetcode.cn/problems/guess-number-higher-or-lower/
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	            -1 if num is lower than the guess number
 *			             1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */
var guess = function (num: number) {return num};
function guessNumber(x: number): number {
      if (x === 0 || x === 1) {
    return x;
  }
  let left = 1;
  let right = x;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (guess(mid) ==-1) {
      right = mid;
    } else if (guess(mid) == 1) {
      left = mid + 1;
    }
    else{  return mid ;}
  }
};

// 力扣189旋转数组 https://leetcode.cn/problems/rotate-array/
function rotate(nums: number[], k: number): void {
  for (let index = 0; index < k; index++) {
    nums.unshift(nums.pop());
  }
}
