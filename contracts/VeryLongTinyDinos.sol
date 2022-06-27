// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract VeryLongTinyDinos is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenCounter;

    string public baseURI;
    string public baseExtension = "";
    uint256 public cost = 0.01 ether;
    uint256 public maxSupply = 10000;
    uint256 public onlyTimeFlg = 1;
    address public tinyDinosContract;
    address public veryLongContract;

    constructor () ERC721 ("VeryLongTinyDinos", "VLTD") {}

    function mint() public payable {
        _tokenCounter.increment();
        uint256 newItemId = _tokenCounter.current();

        _safeMint(msg.sender, newItemId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory){
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, Strings.toString(tokenId), baseExtension))
            : "";
    }

    //設定用関数
    //価格設定
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    //BaseURI設定
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    //BaseExtension設定
    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    //最大供給量設定
    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }

    //ホワイトリスト期間設定
    function setOnlyTimeFlg(uint256 _state) public onlyOwner {
        onlyTimeFlg = _state;
    }

    //ホワイトリストコンタクト1の設定
    function setTinyDinosContract(address _tmpContract) public onlyOwner {
        tinyDinosContract = _tmpContract;
    }

    //ホワイトリストコンタクト2の設定
    function setVeryLongContract(address _tmpContract) public onlyOwner {
        veryLongContract = _tmpContract;
    }

    //引き出し用の関数
    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}