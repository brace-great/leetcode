from typing import *


class Solution:
    def validPartition(self, nums: List[int]) -> bool:
        nlen = len(nums)
        dp = []
        dp.append(False)
        dp.append(nums[0] == nums[1])
        if len(nums) == 2:
            return dp[1]
        dp.append(
            nums[1] == nums[2] == nums[0] or nums[0] == nums[1] - 1 == nums[2] - 2
        )
        for i in range(3, len(nums)):
            dp.append(
                (dp[i - 2] and nums[i - 1] == nums[i])
                or (dp[i - 3] and nums[i - 1] == nums[i - 2] == nums[i])
                or (dp[i - 3] and nums[i] == nums[i - 1] + 1 == nums[i - 2] + 2)
            )
        return dp[len(nums) - 1]


# https://leetcode.cn/problems/subsets-ii/description/
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        path = []
        rs = []

        def bt(n):
            rs.append(path.copy())

            for i in range(n, len(nums)):
                path.append(nums[i])
                bt(i + 1)
                path.pop()

        def remove_duplicates(list_of_lists):
            unique_elements = set(tuple(lst) for lst in list_of_lists)
            return [list(element) for element in unique_elements]

        def sort_sublists(parent_list):
            sorted_parent_list = [sorted(sublist) for sublist in parent_list]
            return sorted_parent_list

        bt(0)
        return remove_duplicates(sort_sublists(rs))


a = Solution()
print(a.validPartition([4, 4, 4, 5, 6]))
