#include <bits/stdc++.h>

using namespace std;

class Solution
{
public:
    int maxFrequency(vector<int> &nums, int k, int numOperations)
    {
        // Sort the array to facilitate the sliding window
        sort(nums.begin(), nums.end());

        int l = 0, maxFreq = 1;
        long long totalOperations = 0; // Total operations used
        long long sum = 0;             // Prefix sum of the current window

        // Sliding window approach
        for (int r = 0; r < nums.size(); ++r)
        {
            // Update the sum of the current window
            sum += nums[r];

            // Calculate the operations needed to make all elements in the window equal to nums[r]
            while (nums[r] * (r - l + 1) - sum > k)
            {
                // If operations exceed k, move left pointer to reduce the window
                sum -= nums[l];
                l++;
            }

            // Calculate the max frequency of elements in the current window
            maxFreq = max(maxFreq, r - l + 1);
        }

        return maxFreq;
    }
};

int main()
{
    Solution sol;
    vector<int> v = {1, 4, 5};
    int k = 1;
    int numOperations = 2;
    cout << sol.maxFrequency(v, k, numOperations) << endl; // Output the maximum frequency
}
