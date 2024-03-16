// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProjectSubmission is Ownable(msg.sender) {
    struct Project {
        string name;
        string description;
        address creator;
        uint256 monthlyYield;
        uint256 grantTotal;
        uint256 period; // number of months to be paid
        bool approved; // Flag to indicate project approval
    }

    Project[] public projects;


    function submitProject(
        string memory _name,
        string memory _description,
        uint256 _monthlyYield,
        uint256 _grantTotal,
        uint256 _period
    ) public {

        // TODO this monthlyYield, grantTotal and period should be setted once the owner and the degranter approve the project
        projects.push(Project(_name, _description, msg.sender, _monthlyYield, _grantTotal, _period, false));
        emit ProjectSubmitted(_name, _description, msg.sender, _monthlyYield, _grantTotal, _period, false);
    }

    event ProjectSubmitted(string name, string description, address creator, uint256 monthlyYield, uint256 grantTotal, uint256 period, bool approved);

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

}
