import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

    return (
        <div className="all-users">
            {potentialChats &&
                potentialChats.map((u, index) => (
                    <div className="single-user" key={index} onClick={() => createChat(user.id, u._id)}>
                        {u.name}
                        <p className={onlineUsers?.some((user) => user?.userId === u?._id) ? 'user-online' : ''}></p>
                    </div>
                ))}
        </div>
    );
};

export default PotentialChats;
