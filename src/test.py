from typing import List


class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        rs = []
        path = []
        used = []
        for i in range(len(nums)):
            used.append(False)

        def backtracking(i):
            if len(path) == len(nums):
                rs.append(path.copy())
                return
            for j in range(i, len(nums)):
                if used[j]:
                    continue
                path.append(nums[j])
                used[j] = True
                backtracking(0)
                used[j] = False
                path.pop()

        backtracking(0)

        return rs


solution = Solution()
print(solution.permute([4, 6, 7]))
