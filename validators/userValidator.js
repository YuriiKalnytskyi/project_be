const Joi = require('joi');

const {
    regexpEnum: {
        EMAIl, PASSWORD, NAME, PHONE
    }
} = require('../constants');

module.exports = {
    createUser: Joi.object({
        avatar: Joi.string()
            .trim(),
        name: Joi.string()
            // .regex(NAME)
            // .alphanum()
            .trim()
            .min(2)
            .max(40)
            .required(),
        firstname: Joi.string()
            // .regex(NAME)
            // .alphanum()
            .trim()
            .min(2)
            .max(40)
            .required(),
        age: Joi.number()
            .integer()
            .min(8)
            .max(99),
        gender: Joi.string()
            .trim(),
        phone: Joi.number(),
        email: Joi.string()
            .regex(EMAIl)
            .required(),
        password: Joi.string()
            .required()
            .regex(PASSWORD)
    }),
    updateUser: Joi.object({
        name: Joi.string()
            .regex(NAME)
            .alphanum()
            .trim()
            .min(2)
            .max(40),
        firstname: Joi.string()
            .regex(NAME)
            .alphanum()
            .trim()
            .min(2)
            .max(40),
        age: Joi.number()
            .integer()
            .min(8)
            .max(99),
        gender: Joi.string()
            .trim(),
        phone: Joi.number(),
        password: Joi.string(),
        email: Joi.string()
            .regex(EMAIl)
    }),
    password: Joi.object({
        password: Joi.string()
            .regex(PASSWORD),
        new_password: Joi.string()
            .regex(PASSWORD),
    }),
    login: Joi.object({
        email: Joi.string()
            .regex(EMAIl)
            .required(),
        password: Joi.string()
            .required()
            .regex(PASSWORD)
    })
};
