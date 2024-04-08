const axios = require("axios");
require("dotenv").config();

const fetchAdresses = async (req, res) => {
    const { adress, postalCode } = req.body;
    const response = await axios.get(
        `https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?returnType=json&countryCode=SE&agreementCountry=SE&postalCode=${postalCode}&streetName=${adress}&numberOfServicePoints=5&srId=EPSG%3A4326&context=optionalservicepoint&responseFilter=public&typeId=24%2C25%2C54&located=all&whiteLabelName=false&apikey=${process.env.POSTNORD_API_KEY}`
    );
  res.status(200).json(response.data.servicePointInformationResponse.servicePoints);
};

module.exports = fetchAdresses;
