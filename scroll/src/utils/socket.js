import { io } from "socket.io-client";
const socket = io("https://scroll-80y0.onrender.com", { autoConnect: false });
export default socket;
