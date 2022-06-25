//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Ticket is
Context,
AccessControlEnumerable,
ERC721Enumerable,
Ownable
{
    using Counters for Counters.Counter;
    using Strings for uint256;

    bytes32 public constant EXEC_ROLE = keccak256("EXEC_ROLE");

    string public description;
    string public image;

    Counters.Counter private _tokenIdTracker;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _image
    ) ERC721(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(EXEC_ROLE, _msgSender());

        description = _description;
        image = _image;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId),"token non exist");
        bytes memory json = abi.encodePacked(
            '{',
            '"name": "', name(), ' #', _tokenId.toString(),
            '",',
            '"description": "', description, '",',
            '"image": "', image, '"',
            '}'
        );
        bytes memory metadata = abi.encodePacked(
            "data:application/json;base64,", Base64.encode(bytes(json))
        );
        return string(metadata);
    }

    function mint(address _to) external returns (uint256) {
        require(hasRole(EXEC_ROLE, _msgSender()), "no role");
        uint256 tokenId = _tokenIdTracker.current();
        _safeMint(_to, tokenId);
        _tokenIdTracker.increment();
        return tokenId;
    }

    function burn(uint256 _tokenId) external {
        require(hasRole(EXEC_ROLE, _msgSender()), "no role");
        _burn(_tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControlEnumerable, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
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