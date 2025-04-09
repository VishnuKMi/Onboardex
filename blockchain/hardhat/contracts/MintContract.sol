// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintContract is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public admin;
    uint256 public mintFee;
    bool public isPaused;

    // Mapping to store metadata CID for each token ID
    mapping(uint256 => string) private tokenMetadataCIDs;

    constructor(
        string memory name,
        string memory symbol,
        address _admin,
        address _owner
    ) ERC721(name, symbol) {
        transferOwnership(_owner);
        admin = _admin;
    }

    event mint(
        uint256 indexed tokenId,
        address indexed to,
        string metadataCID,
        uint256 timestamp
    );
    event transfer(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "not authorized");
        _;
    }

    modifier hasMintFee() {
        require(msg.value >= mintFee, "Insufficient mint fee");
        _;
    }

    modifier whenNotPaused() {
        require(!isPaused, "Contract is Paused");
        _;
    }

    function setMintFee(uint256 fee) external onlyAdmin {
        mintFee = fee;
    }

    function togglePause() external onlyAdmin {
        isPaused = !isPaused;
    }

    function singleMint(
        string memory metadataCID
    ) external payable hasMintFee whenNotPaused onlyOwner {
        require(bytes(metadataCID).length > 0, "Cannot be empty");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        tokenMetadataCIDs[tokenId] = metadataCID;

        emit mint(tokenId, msg.sender, metadataCID, block.timestamp);
    }

    function batchMint(
        string[] memory metadataCIDs
    ) external payable hasMintFee whenNotPaused onlyOwner {
        require(metadataCIDs.length > 0, "Cannot be empty");
        for (uint256 i = 0; i < metadataCIDs.length; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
            tokenMetadataCIDs[tokenId] = metadataCIDs[i];

            emit mint(tokenId, msg.sender, metadataCIDs[i], block.timestamp);
        }
    }

    function transferNFTs(
        address to,
        uint256[] memory tokenIds
    ) external whenNotPaused onlyOwner {
        require(tokenIds.length > 0, "ImageNFT: No token IDs specified");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            _transfer(msg.sender, to, tokenId);

            emit transfer(tokenId, msg.sender, to, block.timestamp);
        }
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        return string(abi.encodePacked(_baseURI(), tokenMetadataCIDs[tokenId]));
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getTokenId(
        string memory metadataCID
    ) public view returns (uint256) {
        bytes32 metadataHash = keccak256(abi.encodePacked(metadataCID)); // Hash the provided metadataCID

        for (
            uint256 tokenId = 0;
            tokenId <= _tokenIdCounter.current();
            tokenId++
        ) {
            bytes32 storedMetadataHash = keccak256(
                abi.encodePacked(tokenMetadataCIDs[tokenId])
            ); // Hash the stored metadataCID

            if (metadataHash == storedMetadataHash) {
                return tokenId;
            }
        }

        revert("Token not found");
    }
}
