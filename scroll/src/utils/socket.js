import { io } from "socket.io-client";
const socket = io("https://scroll-tb0k.onrender.com", { autoConnect: false });
export default socket;
