pragma solidity ^0.4.16;

contract ICO{
    address public owner;
    mapping(address => bool) public investors;
    uint256 public investorsCount;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function ICO(){
        owner = msg.sender;
    }
    
    function whitelistAddresses(address[] _investors) onlyOwner{
        uint256 i = 0;
        for(i;i<_investors.length;i++){
            address investor = _investors[i];
            if(investors[investor] == false){
                investors[investor] = true;
                investorsCount++;    
            }
            
        }
    }
}