const ethApiKey = "SRX4R8IP7EFJMXX3IZYWB9882YFFH1KH4I";

module.exports = async function getAddressData (address) {

    const res = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&apikey=${ethApiKey}`);

    const body = await res.json();

    return body;
}
