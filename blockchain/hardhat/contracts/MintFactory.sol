// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./MintContract.sol";

contract MintFactory {
    address public owner;

    struct MintContractInfo {
        string name;
        string symbol;
        address client;
        address contractAddress;
    }

    mapping(address => MintContractInfo) private clientContracts;
    address[] private clientAddresses;

    event ContractDeployed(
        address indexed contractAddr,
        string name,
        string symbol
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    function deployClient(
        string memory name,
        string memory symbol,
        address client
    ) external onlyOwner {
        MintContract clientContract = new MintContract(
            name,
            symbol,
            msg.sender,
            client
        );
        clientContracts[client] = MintContractInfo(
            name,
            symbol,
            client,
            address(clientContract)
        );
        clientAddresses.push(client);

        emit ContractDeployed(address(clientContract), name, symbol);
    }

    function getAllClientContracts()
        external
        view
        onlyOwner
        returns (MintContractInfo[] memory)
    {
        uint256 count = clientAddresses.length;
        MintContractInfo[] memory contracts = new MintContractInfo[](count);

        for (uint256 i = 0; i < count; i++) {
            address clientAddr = clientAddresses[i];
            contracts[i] = clientContracts[clientAddr];
        }

        return contracts;
    }

    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "invalid address");
        owner = newOwner;
    }
}
