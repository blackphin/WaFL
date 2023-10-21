// import React, { useEffect, useState } from "react";
// import * as PushAPI from "@pushprotocol/restapi";
// import { NotificationItem, SubscribedModal } from "@pushprotocol/uiweb";

// function NotificationComponent() {
//   const [notifications, setNotifications] = useState([]);
//   const [spams, setSpams] = useState([]);
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false);

//   const fetchNotifications = async () => {
//     const userAddress = "eip155:42:0xDcC104234A478cf87d6cceCe1c77FA54C3883D60";
//     const env = "staging";

//     const notificationsData = await PushAPI.user.getFeeds({
//       user: userAddress,
//       env,
//     });
//     setNotifications(notificationsData);

//     const spamsData = await PushAPI.user.getFeeds({
//       user: userAddress,
//       spam: true,
//       env,
//     });
//     setSpams(spamsData);
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const toggleSubscribeModal = () => {
//     setShowSubscribeModal(!showSubscribeModal);
//   };

//   return (
//     <>
//       <h1>Notifications</h1>
//       {notifications.map((notification, index) => (
//         <NotificationItem
//           key={index}
//           notificationTitle={notification.title}
//           notificationBody={notification.body}
//         />
//       ))}

//       <h1>Spam Notifications</h1>
//       {spams.map((spam, index) => (
//         <NotificationItem
//           key={index}
//           notificationTitle={spam.title}
//           notificationBody={spam.body}
//           isSpam
//           subscribeFn={subscribeFn}
//           isSubscribedFn={isSubscribedFn}
//         />
//       ))}

//       <button onClick={toggleSubscribeModal}>Show Subscribe Modal</button>
//       {showSubscribeModal && <SubscribedModal onClose={toggleSubscribeModal} />}
//     </>
//   );
// }

// export default NotificationComponent;
