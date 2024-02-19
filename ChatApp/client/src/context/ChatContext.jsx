import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRequest, getRequest } from '../utils/services';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    const [notifications, setNotifications] = useState([]);
    console.log('notifications: ', notifications);

    // Khởi tạo socket
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    // Thêm người dùng online
    useEffect(() => {
        if (!socket) return;
        socket.emit('addNewUser', user?.id);
        socket.on('getOnlineUsers', (response) => {
            setOnlineUsers(response);
        });

        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket]);

    // Gửi tin nhắn
    useEffect(() => {
        if (!socket) return;

        const recipientId = currentChat?.members?.find((id) => id !== user?.id);

        socket.emit('sendMessage', { ...newMessage, recipientId });
    }, [newMessage]);

    // Nhận tin nhắn và thông báo
    useEffect(() => {
        if (!socket) return;

        socket.on('getMessage', (response) => {
            if (currentChat?._id !== response.chat_id) return;

            setMessages((prev) => [...prev, response]);
        });

        socket.on('getNotification', (response) => {
            const isChatOpen = currentChat?.members.some((id) => id === response.senderId);

            if (isChatOpen) {
                setNotifications((prev) => [{ ...response, isRead: true }, ...prev]);
            } else {
                setNotifications((prev) => [response, ...prev]);
            }
        });

        return () => {
            socket.off('getMessage');
            socket.off('getNotification');
        };
    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.log('Lỗi lấy dữ liệu người dùng :', response);
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user?.id === u._id) {
                    return false;
                }
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
            setAllUsers(response);
        };

        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user.id}`);

                setIsUserChatsLoading(false);
                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);
            }
        };
        getUserChats();
    }, [user]);

    // Lấy tin nhắn hiện tại
    useEffect(() => {
        if (currentChat?._id) {
            const getMessages = async () => {
                setIsMessagesLoading(true);
                setMessagesError(null);

                const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

                setIsMessagesLoading(false);
                if (response.error) {
                    return setMessagesError(response);
                }

                setMessages(response);
            };
            getMessages();
        }
    }, [currentChat]);

    // Gửi tin nhắn
    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) {
            return console.log('Vui lòng nhập tin nhắn...');
        }

        const response = await postRequest(
            `${baseUrl}/messages`,
            JSON.stringify({
                chatId: currentChatId,
                senderId: sender.id,
                text: textMessage,
            })
        );

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage('');
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    // Tạo mới đoạn chat
    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secondId }));

        if (response.error) {
            return console.log('Lỗi tạo mới đoạn chat :', response);
        }

        setUserChats((prev) => [...prev, response]);
    }, []);

    const markAllNotificationsAsRead = useCallback((notifications) => {
        const mNotifications = notifications.map((n) => {
            return { ...n, isRead: true };
        });

        setNotifications(mNotifications);
    }, []);

    // const marNotificationAsRead = useCallback((n, userChats, user, notifications) => {}, []);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                userChatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                messagesError,
                currentChat,
                sendTextMessage,
                onlineUsers,
                notifications,
                allUsers,
                markAllNotificationsAsRead,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
