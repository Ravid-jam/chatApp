import { io } from "socket.io-client";

const SOCKET_URL = "https://chat-app-indol-two-24.vercel.app"; // Replace with your backend URL
const socket = io(SOCKET_URL);

export default socket;
