function evalRPN(tokens: string[]): number {
  const core = {
    "+": (a, b) => {
      return a + b;
    },
    "-": (a, b) => {
      return a - b;
    },
    "*": (a, b) => {
      return a * b;
    },
    "/": (a, b) => {
      return a / b;
    },
  };
  const stack = [];
  tokens.forEach((e) => {
    if (!e.match(/^-*[0-9]+$/)) {
      let a = stack.pop();
      let b = stack.pop();
      stack.push(~~core[e](b, a));
    } else stack.push(parseInt(e));
  });
  return stack[0];
}
evalRPN(["4", "3", "-"]);

//84. 柱状图中最大的矩形 https://leetcode-cn.com/problems/largest-rectangle-in-histogram/
function largestRectangleArea(heights: number[]): number {
  const stack = [];
  let max = 0;
  stack.push(-1);
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] >= heights[stack[stack.length - 1]]) {
      stack.push(i);
    } else {
      while (heights[i] < heights[stack[stack.length - 1]]) {
        max = Math.max(
          max,
          heights[stack.pop()] * (i - stack[stack.length - 1] - 1)
        );
      }
      stack.push(i);
    }
  }
  while (stack.length > 1) {
    max = Math.max(
      max,
      heights[stack.pop()] * (heights.length - stack[stack.length - 1] - 1)
    );
  }
  return max;
}
//85. 最大矩形 https://leetcode-cn.com/problems/maximal-rectangle/
function maximalRectangle(matrix: string[][]): number {
  let gg = [...matrix[0]].map((e) => parseInt(e));
  let max = largestRectangleArea(gg);
  for (let i = 1; i < matrix.length; i++) {
    const ggg = [...matrix[i]].map((e) => parseInt(e));
    gg = gg.map((e, index) => (ggg[index] != 0 ? 1 + e : 0));
    max = Math.max(max, largestRectangleArea(gg));
  }
  return max;
}
