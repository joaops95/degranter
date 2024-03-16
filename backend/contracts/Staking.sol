// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ProjectSubmission.sol";

contract Staking {
    // Replace with the actual ERC-20 token address used for staking
    IERC20 public stakingToken;

    ProjectSubmission public projects;

    struct UserStake {
        uint256 projectId;
        uint256 amount;
    }

    mapping(address => UserStake[]) public userStakes;
    mapping(uint256 => address[]) public projectStakers; // Mapping project ID to stakers
    mapping(address => uint256) public userRewards;

    // Total amount of tokens currently staked across all projects
    uint256 public totalStaked;

    constructor(IERC20 _stakingToken, address _projectSubmission) {
        stakingToken = _stakingToken;
        projects = ProjectSubmission(_projectSubmission);
    }

    // 1. Check if project ID is valid (optional)
    // 2. Call `stakingToken.transferFrom` to transfer tokens from user
    // 3. Update `projectStakes` with the new amount
    // 4. Emit an event to log the amount staked
    function stakeOnProject(uint256 _projectId, uint256 _amount) public {
        require(_amount > 0, "Stake amount cannot be zero");
        stakingToken.transferFrom(msg.sender, address(this), _amount);
        userStakes[msg.sender].push(UserStake(_projectId, _amount));
        projectStakers[_projectId].push(msg.sender); // Add staker to projectStakers
        totalStaked += _amount;
        emit ProjectStaked(msg.sender, _projectId, _amount);
    }

    event ProjectStaked(address staker, uint256 projectId, uint256 amount);

    // (Optional) Function to calculate reward for a user on a project (replace with your reward logic)
    function calculateReward(
        address user,
        uint256 projectId
    ) public view returns (uint256) {
        return
            projects.getProjects()[projectId].monthlyYield * userStakes[user][projectId].amount;
    }
    
    function getProjectStakers(uint256 _projectId) public view returns (address[] memory) {
        return projectStakers[_projectId];
    }

    function getProjectTotalStaked(uint256 _projectId) public view returns (uint256) {
        uint256 _totalStaked = 0;
        for (uint256 i = 0; i < getProjectStakers(_projectId).length; i++) {
            _totalStaked += userStakes[getProjectStakers(_projectId)[i]][_projectId].amount;
        }
        return _totalStaked;
    }

    // (Optional) Function to distribute rewards periodically (consider gas optimization)
    function distributeRewards() public {
        for (uint256 i = 0; i < projects.getProjectCount(); i++) {
            uint256 projectId = projects.getProjects()[i].id;

            for (uint256 j = 0; j < getProjectStakers(projectId).length; j++) {
                address staker = getProjectStakers(projectId)[j];
                uint256 reward = calculateReward(staker, projectId);
                userRewards[staker] += reward;
            }
        }
    }

    // (Optional) Function for users to claim their accumulated rewards
    function claimRewards() public {
        uint256 claimableReward = userRewards[msg.sender];
        require(claimableReward > 0, "No rewards to claim");

        // Transfer rewards to user (ensure only the contract can call this function)
        stakingToken.transfer(msg.sender, claimableReward);

        // Reset user's accumulated rewards
        userRewards[msg.sender] = 0;
    }
}
