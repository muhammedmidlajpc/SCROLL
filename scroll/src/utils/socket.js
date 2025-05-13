import { io } from "socket.io-client";
const socket = io("https://scroll-back-end.onrender.com", { autoConnect: false });
export default socket;
