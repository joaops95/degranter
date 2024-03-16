// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProjectSubmission is Ownable(msg.sender) {

    // Counter to track the next available project ID
    uint256 public projectCount = 0;

    struct Project {
        uint256 id;          // Added ID field
        string name;
        string description;
        address creator;
        uint256 monthlyYield;
        uint256 grantTotal;
        uint256 period;
        bool approved;
    }

    Project[] public projects;

    function submitProject(
        string memory _name,
        string memory _description,
        uint256 _monthlyYield,
        uint256 _grantTotal,
        uint256 _period
    ) public {
        projects.push(Project(
            projectCount++, // Assign the next available ID
            _name,
            _description,
            msg.sender,
            _monthlyYield,
            _grantTotal,
            _period,
            false
        ));

        emit ProjectSubmitted(projectCount - 1, _name, _description, msg.sender, _monthlyYield, _grantTotal, _period, false); // Emit event with assigned ID
    }

    event ProjectSubmitted(uint256 id, string name, string description, address creator, uint256 monthlyYield, uint256 grantTotal, uint256 period, bool approved);

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function approveProject(uint256 _projectId) public onlyOwner {
        require(_projectId < projectCount, "Invalid project ID");

        projects[_projectId].approved = true;

        emit ProjectApproved(_projectId);
    }

    event ProjectApproved(uint256 projectId);

    function getProject(uint256 _projectId) public view returns (Project memory) {
        require(_projectId < projectCount, "Invalid project ID");

        // check if project exists

        if (projects[_projectId].id == 0) {
            revert("Project does not exist");
        }

        return projects[_projectId];
    }

    function getProjectCount() public view returns (uint256) {
        return projectCount;
    }
  
}