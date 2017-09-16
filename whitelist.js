const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8549'));

const abi = require('./abi.json');
const ADDRESSES = require('./ADDRESSES')();
const UNLOCKED_ACCOUNT = '0x81472A6Ec17519230d8F1586D00eAe4523052B80';
const CONTRACT_ADDRESS = '0x4d42B981c9C02708016d8c0c176D1FC8a43cC5bf';

const Addresses_per_tx = 120;
const slices = Math.ceil(ADDRESSES.length / Addresses_per_tx);

const myContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS, {
    from: UNLOCKED_ACCOUNT, // default from address
    gasPrice: '20000000000' // default gas price in wei ~20gwei
});

whitelist(slices).then(console.log);
function whitelist(slice) {
    const start = (slice - 1) * Addresses_per_tx;
    const end = (slice) * Addresses_per_tx;
    const proccessingArray = ADDRESSES.slice(start, end);
    console.log('processing:', proccessingArray);
    return new Promise((resolve, reject) => {
        myContract.methods.whitelistAddresses(proccessingArray).estimateGas().then((gasNeeded) => {
            myContract.methods.whitelistAddresses(proccessingArray).send({
                gas: gasNeeded
            }).then((receipt) => {
                slice--;
                console.log(receipt,slice);
                if (slice > 0) {
                    whitelist(slice);
                } else {
                    resolve('done');
                }
            })
        });
    })

}
