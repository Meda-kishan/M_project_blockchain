//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Company.sol";

contract Central {
    address[] walletAddresses;

    mapping(address => address) walletAddressToSmartContractAddress;

    function createSmartContract() public {
        Company companyContract = new Company(msg.sender);
        walletAddresses.push(address(companyContract));
        walletAddressToSmartContractAddress[msg.sender] = address(
            companyContract
        );
    }

    function getCompanySmartContractAddress(address _walletAddress)
        public
        view
        returns (address)
    {
        return walletAddressToSmartContractAddress[_walletAddress];
    }

    function addproduct(
        address _ownerAddress,
        address _contractAddress,
        uint256[] memory _products,
        string[] memory manufacturers_id_list,
        string[] memory prd_name_list,
        string[] memory prd_brand_list



    ) public returns (string memory) {
        return Company(_contractAddress).addProducts(_ownerAddress, 
                                                    _products,
                                                    manufacturers_id_list,
                                                    prd_name_list,
                                                    prd_brand_list);
    }

    function checkProduct(address _contractAddress, uint256 _productHashCode)
        public
        view
        returns (string memory)
    {
        return Company(_contractAddress).verifyProduct(_productHashCode);
    }

    function retrieve(address _val) public pure returns (address) {
        return _val;
    }
}
