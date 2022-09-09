// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {

    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        simpleStorageArray.push(new SimpleStorage());
    }

    function sfStore(uint256 _simpleStorageIdx, uint256 _simpleStorageNumber) public {
        SimpleStorage selectedContract = simpleStorageArray[_simpleStorageIdx];
        selectedContract.store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIdx) public view returns (uint256){
        SimpleStorage selectedContract = simpleStorageArray[_simpleStorageIdx];
        return selectedContract.retrieve();
    }
}
