import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config();
​
const PK = process.env.VITE_CHANNEL_PRIVATE_KEY 
console.log(PK);
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);
​
const sendNotification = async() => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 1, 
      identityType: 2, 
      notification: {
        title: `[SDK-TEST] notification TITLE:`,
        body: `[sdk-test] notification BODY`
      },
      payload: {
        title: `[sdk-test] payload title`,
        body: `sample msg body`,
        cta: '',
        img: ''
      },
      channel: 'eip155:5:0xDcC104234A478cf87d6cceCe1c77FA54C3883D60', 
      env: 'staging'
    });
  } catch (err) {
    console.error('Error: ', err);
  }
}
​
sendNotification();