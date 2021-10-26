pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Access is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    uint public count;

    constructor() ERC721("4ccess", "4CCESS") {}

    // TODO: restrict the ownership of this function to a minter/admin (openzeppelin)
    // TODO: pass in a unique ID and add mapping (tokenUri, metadata)
    function mint() public {
        require(count < 444, "Minting has ended.");
        _tokenIds.increment();

        // to address and token id passed in below
        _safeMint(msg.sender, _tokenIds.current());
        count++;
    }


    // Overriden methods implemented from ERC721Enumerable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
