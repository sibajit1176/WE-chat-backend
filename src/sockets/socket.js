const jwt = require("jsonwebtoken");
const messageService = require("../modules/messages/message.service");

module.exports = (io) => {

    io.use((socket, next) => {

        try {

            const token = socket.handshake.auth?.token;

            if (!token) {
                return next(new Error("Authentication failed"));
            }

            const decoded = jwt.verify(
                token,
                process.env.SECRET_KEY
            );

            socket.user = decoded;

            next();

        } catch (error) {

            next(new Error("Invalid Token"));

        }

    });

    io.on("connection", (socket) => {

        console.log(`User ${socket.user.userId} connected`);

        socket.on("join-room", (chatId) => {

            socket.join(`chat_${chatId}`);

            console.log(
                `User ${socket.user.userId} joined chat_${chatId}`
            );

        });

        socket.on(
            "send-message",
            async (payload, callback) => {

                try {

                    const result =
                        await messageService.sendMessageService(
                            socket.user.userId,
                            payload
                        );

                    io.to(`chat_${payload.chatId}`).emit(
                        "receive-message",
                        result.data
                    );

                    callback(result);

                } catch (error) {

                    callback({
                        success: false,
                        message: error.message
                    });

                }

            }
        );
        socket.on("typing",(chatId)=>{
            socket.to(`chat_${chatId}`).emit("user-typing")
        })

        socket.on("disconnect", () => {

            console.log(
                `User ${socket.user.userId} disconnected`
            );

        });

    });

};