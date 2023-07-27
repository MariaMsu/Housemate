const mongoose = require("mongoose");
const utilsForModels = require("./utilsForModels");
const Schema = mongoose.Schema;  // for foreign keys

const ChatSchema = new mongoose.Schema({

    chatName: {
        type: String,
        required: true,
        maxLength: 32,
    },
    chatPicture: {
        type: String,  // HEX colour
        required: true,
        default: () => utilsForModels.randomHexColorCode(),
        validate: {
            validator: function (value) {
                let reg = /[\dabcdef]{6}/g;
                return reg.test(value);
            },
            message: "Invalid hex color code"
        }
    },
    spaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    chatMembers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

ChatSchema.set('versionKey', false);  // don't store {..., "__v":0}

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
