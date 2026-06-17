const User = require('./usere.model');
const Chat = require('./chat.model');
const Message = require('./messages');
const ChatMember = require('./chatmember');

// User ↔ Message
User.hasMany(Message, {
    foreignKey: 'senderId'
});

Message.belongsTo(User, {
    foreignKey: 'senderId'
});

// Chat ↔ Message
Chat.hasMany(Message, {
    foreignKey: 'chatId'
});

Message.belongsTo(Chat, {
    foreignKey: 'chatId'
});

// User ↔ Chat
User.belongsToMany(Chat, {
    through: ChatMember,
    foreignKey: 'userId'
});

Chat.belongsToMany(User, {
    through: ChatMember,
    foreignKey: 'chatId'
});

// Chat ↔ ChatMember
Chat.hasMany(ChatMember, {
    foreignKey: 'chatId',
    as: 'myMembership'
});

Chat.hasMany(ChatMember, {
    foreignKey: 'chatId',
    as: 'otherMembers'
});

ChatMember.belongsTo(Chat, {
    foreignKey: 'chatId'
});

// User ↔ ChatMember
User.hasMany(ChatMember, {
    foreignKey: 'userId'
});

ChatMember.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = {
    User,
    Chat,
    Message,
    ChatMember
};