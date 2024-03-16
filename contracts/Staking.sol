// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    // Replace with the actual ERC-20 token address used for staking
    IERC20 public stakingToken;

    // Mapping to store the total amount staked for each project ID

    mapping(address => mapping(uint256 => uint256)) public userStakes;

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function stakeOnProject(uint256 _projectId, uint256 _amount) public {
        // 1. Check if project ID is valid (optional)
        // 2. Call `stakingToken.transferFrom` to transfer tokens from user
        // 3. Update `projectStakes` with the new amount
        // 4. Emit an event to log the amount staked

        require(_amount > 0, "Stake amount cannot be zero");


        stakingToken.transferFrom(msg.sender, address(this), _amount);

        userStakes[msg.sender][_projectId] += _amount;

        emit ProjectStaked(msg.sender, _projectId, _amount);


    }

    event ProjectStaked(address staker, uint256 projectId, uint256 amount);
}
