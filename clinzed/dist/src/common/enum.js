"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROPERTY_STATUS = exports.CARD_STATUS = exports.COMMON_STATUS = exports.CARD_TYPE = exports.PHOTO_STATUS = exports.CUSTOMER_CAR_STATUS = exports.UserStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role = exports.Role || (exports.Role = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING"] = "PENDING";
    UserStatus["APPROVED"] = "APPROVED";
    UserStatus["PAUSED"] = "PAUSED";
    UserStatus["BANNED"] = "BANNED";
    UserStatus["DELETED"] = "DELETED";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var CUSTOMER_CAR_STATUS;
(function (CUSTOMER_CAR_STATUS) {
    CUSTOMER_CAR_STATUS["ACTIVE"] = "ACTIVE";
    CUSTOMER_CAR_STATUS["DELETED"] = "DELETED";
})(CUSTOMER_CAR_STATUS = exports.CUSTOMER_CAR_STATUS || (exports.CUSTOMER_CAR_STATUS = {}));
var PHOTO_STATUS;
(function (PHOTO_STATUS) {
    PHOTO_STATUS["ACTIVE"] = "ACTIVE";
    PHOTO_STATUS["DELETED"] = "DELETED";
})(PHOTO_STATUS = exports.PHOTO_STATUS || (exports.PHOTO_STATUS = {}));
var CARD_TYPE;
(function (CARD_TYPE) {
    CARD_TYPE["VISA"] = "VISA";
    CARD_TYPE["MASTERCARD"] = "MASTERCARD";
    CARD_TYPE["DEBIT"] = "DEBIT";
})(CARD_TYPE = exports.CARD_TYPE || (exports.CARD_TYPE = {}));
var COMMON_STATUS;
(function (COMMON_STATUS) {
    COMMON_STATUS["ACTIVE"] = "ACTIVE";
    COMMON_STATUS["DELETED"] = "DELETED";
})(COMMON_STATUS = exports.COMMON_STATUS || (exports.COMMON_STATUS = {}));
var CARD_STATUS;
(function (CARD_STATUS) {
    CARD_STATUS["ACTIVE"] = "ACTIVE";
    CARD_STATUS["DELETED"] = "DELETED";
})(CARD_STATUS = exports.CARD_STATUS || (exports.CARD_STATUS = {}));
var PROPERTY_STATUS;
(function (PROPERTY_STATUS) {
    PROPERTY_STATUS["PENDING"] = "PENDING";
    PROPERTY_STATUS["LISTED"] = "LISTED";
    PROPERTY_STATUS["PAUSED"] = "PAUSED";
    PROPERTY_STATUS["BANNED"] = "BANNED";
    PROPERTY_STATUS["DELETED"] = "DELETED";
})(PROPERTY_STATUS = exports.PROPERTY_STATUS || (exports.PROPERTY_STATUS = {}));
//# sourceMappingURL=enum.js.map