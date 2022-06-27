//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC721Ticket.sol";

interface IERC721Spot is IERC721Enumerable, IERC721Metadata {}

contract ERC721Exchangeable is
Ownable
{
    event DepositToken(address indexed spotAddr, uint256 spotTokenId, uint256 ticketTokenId);
    event WithdrawToken(address indexed spotAddr, uint256 spotTokenId, uint256 ticketTokenId);

    mapping(address => address) _contracts;

    constructor() {}


    function deploy(address _spotAddr) external returns (address) {
        require(!_exists(_spotAddr), "ticket exist");
        IERC721Spot spot = IERC721Spot(_spotAddr);
        require(spot.supportsInterface(0x80ac58cd), "interface not support");

        ERC721Ticket _contract = new ERC721Ticket(
            string(abi.encodePacked(spot.name(), " Ticket")),
            string(abi.encodePacked(spot.symbol(), "T")),
            "This token is a ticket. You can use this to randomly get the source NFT token.",
            "https://3.bp.blogspot.com/-THmjl_LUZuw/WKFjJBIqSgI/AAAAAAABBvo/0_vS93dd-30ear9xO8GrZsKhFM2XlIlzQCLcB/s800/ticket_premium.png"
        );
        _contract.transferOwnership(owner());
        _contracts[_spotAddr] = address(_contract);
        return address(_contract);
    }

    function getTicketAddress(address _spotAddr) external view returns (address) {
        require(_exists(_spotAddr), "ticket not exist");
        return _contracts[_spotAddr];
    }

    function getTicketCount(address _spotAddr) external view returns (uint256) {
        require(_exists(_spotAddr), "ticket not exist");
        return ERC721Ticket(_contracts[_spotAddr]).balanceOf(address(this));
    }

    function _exists(address _spotAddr) internal view returns (bool) {
        return _contracts[_spotAddr] != address(0);
    }

    function depositToken(address _spotAddr, uint256 _tokenId) external {
        require(_exists(_spotAddr), "ticket not exist");

        IERC721Spot spot = IERC721Spot(_spotAddr);
        require(msg.sender == spot.ownerOf(_tokenId), "you are not token owner");
        spot.safeTransferFrom(msg.sender, address(this), _tokenId, "");
        uint256 tokenId = ERC721Ticket(_contracts[_spotAddr]).mint(msg.sender);

        emit DepositToken(_spotAddr, _tokenId, tokenId);
    }

    function withdrawToken(address _spotAddr, uint256 _tokenId) external {
        require(_exists(_spotAddr), "ticket not exist");

        ERC721Ticket ticket = ERC721Ticket(_contracts[_spotAddr]);
        require(msg.sender == ticket.ownerOf(_tokenId), "you are not ticket owner");
        ticket.burn(_tokenId);

        IERC721Spot spot = IERC721Spot(_spotAddr);
        uint256 tokenId = spot.tokenOfOwnerByIndex(address(this), _rand(spot.balanceOf(address(this))));
        spot.safeTransferFrom(address(this), msg.sender, tokenId, "");

        emit WithdrawToken(_spotAddr, tokenId, _tokenId);
    }

    function _rand(uint256 _mod) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % _mod;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}