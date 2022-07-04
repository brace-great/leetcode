//剑指 Offer 50. 第一个只出现一次的字符 https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/
function firstUniqChar(s: string): string {
  const map = new Map();
  for (let i of s) {
    if (!map.get(i)) map.set(i, 1);
    else map.set(i, map.get(i) + 1);
  }
  for (let [key, value] of map) {
    if (value === 1) return key;
  }
  return " ";
}

//953. 验证外星语词典 https://leetcode.cn/problems/verifying-an-alien-dictionary/
function isAlienSorted(words: string[], order: string): boolean {
    if (words.length === 1) return true
  let map = {}
  for (let i = 1; i < 27; i++) {
    map[order[i - 1]] = i
  }
  function isWrong(a, b) {
    if (a.length > b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (map[a[i]] > map[b[i]]) return false
      if (map[a[i]] < map[b[i]]) return true
    }
    return false
  }
  for (let i = 0; i < words.length - 1; i++) {
    if (isWrong(words[i], words[i + 1])) return false
  }
  return true
}
//力扣剑指 Offer 03. 数组中重复的数字 https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
function findRepeatNumber(nums: number[]): number {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      return nums[i];
    } else {
      map.set(nums[i], 1);
    }
  }
  return -1;
}

//力扣242. 有效的字母异位词 https://leetcode-cn.com/problems/valid-anagram/
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  const map = new Map();
  for (const c of s) {
    if (map.has(c)) {
      map.set(c, map.get(c) + 1);
    } else {
      map.set(c, 1);
    }
  }
  for (const c of t) {
    if (map.has(c)) {
      map.set(c, map.get(c) - 1);
      if (map.get(c) === 0) {
        map.delete(c);
      }
    } else {
      return false;
    }
  }
  return map.size === 0;
}