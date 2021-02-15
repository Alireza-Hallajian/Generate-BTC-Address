const crypto = require('crypto');
const bs58 = require('bs58')


// Bitcoin Address Publick-Key
const pubkey = "02f7fd905462c980161309d29269730d5791bde43d52c7fe85f666afa18f833e3f";
let buffer_of_pubkey = Buffer.from(pubkey, 'hex');

let sha256 = crypto.createHash('sha256').update(buffer_of_pubkey).digest();    // returns buffer


// '00' is for Bitcoin
const fingerprint = "00" + crypto.createHash('ripemd160').update(sha256).digest('hex');
let buffer_of_fingerprint = Buffer.from(fingerprint, 'hex');


let fingerprint_sha_1 = crypto.createHash('sha256').update(buffer_of_fingerprint).digest();    // returns buffer
let fingerprint_sha_2 = crypto.createHash('sha256').update(fingerprint_sha_1).digest('hex');


// first 4-bytes of fingerprint that is two times hashed to 'sha256'
const checksum = fingerprint_sha_2.substr(0, 8);


// buffer of needed parts to generate Bitcoin Address
const bytes_of_addr = Buffer.from( fingerprint + checksum, 'hex' );
const Address = bs58.encode(bytes_of_addr)

console.log("Bitcoin Address: " + Address);