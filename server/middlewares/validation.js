import { Joi, celebrate } from 'celebrate';

const nameSchema = Joi.string().min(2).max(100).required();
const descriptionSchema = Joi.string().required();
const locationSchema = Joi.string().min(2).required();
const typeSchema = Joi.string().valid('Недвижимость', 'Авто', 'Услуги').required();

// Валидация для недвижимости
const realEstateValidation = Joi.object().keys({
    name: nameSchema,
    description: descriptionSchema,
    location: locationSchema,
    type: typeSchema,
    propertyType: Joi.string().required(),
    area: Joi.number().min(1).required(),
    rooms: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
});

// Валидация для авто
const autoValidation = Joi.object().keys({
    name: nameSchema,
    description: descriptionSchema,
    location: locationSchema,
    type: typeSchema,
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    mileage: Joi.number().min(0).required(),
});

// Валидация для услуг
const servicesValidation = Joi.object().keys({
    name: nameSchema,
    description: descriptionSchema,
    location: locationSchema,
    type: typeSchema,
    serviceType: Joi.string().required(),
    experience: Joi.number().min(1).required(),
    cost: Joi.number().min(0).required(),
});

// Основная валидация для post и patch
const postItemValidation = celebrate({
    body: Joi.object().keys({
        type: typeSchema,
    }).unknown(true).custom((value, helpers) => {
        if (value.type === 'Недвижимость') {
            const { error } = realEstateValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        } else if (value.type === 'Авто') {
            const { error } = autoValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        } else if (value.type === 'Услуги') {
            const { error } = servicesValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        }
        return value;
    }),
});

// Валидация для обновления
const patchItemValidation = celebrate({
    body: Joi.object().keys({
        type: typeSchema,
    }).unknown(true).custom((value, helpers) => {
        if (value.type === 'Недвижимость') {
            const { error } = realEstateValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        } else if (value.type === 'Авто') {
            const { error } = autoValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        } else if (value.type === 'Услуги') {
            const { error } = servicesValidation.validate(value);
            if (error) return helpers.error('any.invalid');
        }
        return value;
    }),
});

const currentItemValidation = celebrate({
    params: Joi.object().keys({
        id: Joi.string().required().hex().length(24),
    }),
});

export default {
    currentItemValidation,
    postItemValidation,
    patchItemValidation,
};
