//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Company {
    uint256[] Products;

    mapping(uint256 => bool) hashcodeToTrue;

    //Map productID to their respective details
    mapping(uint256 => string[]) prd_id_to_prd_details;

    address owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    function addProducts(address _ownerAddress, 
                        uint256[] memory _products,  
                        string[] memory manufacturers_id_list, 
                        string[] memory prd_name_list, 
                        string[] memory prd_brand_list  )
        public
        returns (string memory)
    {
        require(_ownerAddress == owner,"only owners can add the products");
       

        for (uint256 i; i < _products.length; i++) {

            require(i < manufacturers_id_list.length && i < prd_name_list.length && i < prd_brand_list.length, "Array index out of bounds");


            string memory manufacturers_id=manufacturers_id_list[i];
            string memory prd_name=prd_name_list[i];
            string memory prd_brand=prd_brand_list[i];


            string[3] memory prd_details;
            prd_details[0]=manufacturers_id;
            prd_details[1]=prd_name;
            prd_details[2]=prd_brand;


            prd_id_to_prd_details[_products[i]]=prd_details;

            hashcodeToTrue[_products[i]] = true;
        }

        return "Products added";

    }


    function verifyProduct(uint256 _hashcode)
        public
        view
        returns (string[] memory)
    {
        if (hashcodeToTrue[_hashcode]) {
            return prd_id_to_prd_details[_hashcode];
        } else {
            string[] memory counterfeitResult=new string[](1);
            counterfeitResult[0]="Counterfeit";
            return counterfeitResult;
        }
    }

    function get_data(uint product_id)
    public
    view
    returns (string[] memory)
    {
        return prd_id_to_prd_details[product_id];
    }
}
