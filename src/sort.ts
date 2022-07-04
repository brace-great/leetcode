

//力扣912 排序数组 归并排序 https://leetcode.cn/problems/sort-an-array/
function sortArrayMerge(nums: number[]): number[] {
  const merge = (left: number[], right: number[]): number[] => {
    let result: number[] = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result.concat(left, right);
  };
  const mergeSort = (nums: number[]): number[] => {
    if (nums.length < 2) {
      return nums;
    }
    const mid = Math.floor(nums.length / 2);
    const left = nums.slice(0, mid);
    const right = nums.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  };
  return mergeSort(nums);
}
//力扣912 排序数组 堆排序 https://leetcode-cn.com/problems/sort-an-array/
var sortArrayHeap = function (nums: number[]): number[] {
  var len = nums.length;
  // 建立大顶堆
  function buildMaxHeap(arr: number[]) {
    for (var i = Math.floor(len / 2); i >= 0; i--) {
      heapify(arr, i);
    }
  }
  // 堆调整
  function heapify(arr: number[], i: number) {
    var left = 2 * i + 1,
      right = 2 * i + 2,
      largest = i;

    if (left < len && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest != i) {
      swap(arr, i, largest);
      heapify(arr, largest);
    }
  }
  function swap(arr: number[], i: number, j: number) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function heapSort(arr: number[]) {
    buildMaxHeap(arr);
    for (var i = arr.length - 1; i > 0; i--) {
      swap(arr, 0, i);
      len--;
      heapify(arr, 0);
    }
    return arr;
  }
  return heapSort(nums);
};

//力扣912 排序数组 希尔排序 https://leetcode-cn.com/problems/sort-an-array/
function sortArrayShell(nums: number[]): number[] {
  const shellSort = (nums: number[], gap: number): number[] => {
    if (gap > nums.length / 2) {
      return nums;
    } else {
      let temp = shellSort(nums, gap * 2);
      return insertSortWithGap(temp, gap);
    }
  };
  //插入排序
  const insertSort = (nums: number[]): number[] => {
    for (let i = 1; i < nums.length; i++) {
      let j = i;
      while (j > 0 && nums[j] < nums[j - 1]) {
        [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
        j--;
      }
    }
    return nums;
  };
  const insertSortWithGap = (nums: number[], gap: number): number[] => {
    for (let i = 0; i < nums.length / gap; i++) {
      let temp = [];
      let record = [];
      for (let j = i; j < nums.length; j += gap) {
        temp.push(nums[j]);
        record.push(j);
      }
      insertSort(temp);
      for (let j = 0; j < temp.length; j++) {
        nums[record[j]] = temp[j];
      }
    }
    return nums;
  };
  return shellSort(nums, 1);
}
