const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;  // for foreign keys

const SpaceSchema = new mongoose.Schema({

    spaceName: {
        type: String,
        required: true,
        maxLength: 32,
    },

    spaceMembers: [
        {
            _id: false, // Stop Mongoose from creating _id property for sub-document
            memberId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            isAdmin: {
                type: Boolean,
                default: false
            }
        }
    ],

    premiumExpiration: {
        type: Date,
        // 30 days free trial
        default: () => (new Date().setDate(new Date().getDate() + 30))
    },

    inviteCode: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                let reg = /[0-9a-z]{6}/g;
                return reg.test(value);
            },
            message: "Invalid invite code"
        },
        unique: true,
        index: true,
    }
});

SpaceSchema.set('versionKey', false);  // don't store {..., "__v":0}
SpaceSchema.plugin(uniqueValidator);  // Uniqueness validator. By default, mongoose does not check uniqueness

const Space = mongoose.model("Space", SpaceSchema);
module.exports = Space;
