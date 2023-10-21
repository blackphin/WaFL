import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";

const signer = ethers.Wallet.createRandom()

const userAlice = await PushAPI.initialize(signer, { env: "staging" });

const response = await userAlice.channel.create({
  name: "Test Channel",
  description: "Test Description",
  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC",
  url: "https://push.org",
});

const res = await userAlice.channel.send(
  [
    "eip155:5:0x47190c235971DC55a07d7A7C963E42761C8956D8",
    "eip155:5:0x42376BfbCABB54FD91c04D80855226C6556D147e",
  ],
  {
    notification: {
      title: "hi",
      body: "test-targeted",
    },
    payload: {
      title: "testing first notification",
      body: "testing with random body",
      cta: "https://youtube.com/",
      embed: "https://avatars.githubusercontent.com/u/64157541?s=200&v=4",
      index: {
        index: 1,
        value: 10,
      },
    },
  }
);
