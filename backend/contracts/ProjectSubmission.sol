// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProjectSubmission is Ownable(msg.sender) {
    struct Project {
        string name;
        string description;
        address creator;
    }

    Project[] public projects;


    function submitProject(
        string memory _name,
        string memory _description
    ) public {
        projects.push(Project(_name, _description, msg.sender));
        emit ProjectSubmitted(_name, _description, msg.sender);
    }

    event ProjectSubmitted(string name, string description, address creator);

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

}
