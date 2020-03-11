import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
    firstName : Joi.string().min(4).max(20).required(),
    // otherName: Joi.string().min(3).max(30),
    lastName:Joi.string().min(3).required(),
    // phoneNumber:Joi.number().integer().required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    passportUrl:Joi.string().required(),
    isAdmin: Joi.string().required(),
    userRole: Joi.string().required()

});
export default userSchema;