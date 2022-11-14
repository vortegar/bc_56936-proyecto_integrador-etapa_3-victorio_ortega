import Joi from "joi";

class ProductValidator {
    
    static validate(product) {

        const productSchema = Joi.object({
            nombre: Joi.string().min(2).max(30).required(),
            price: Joi.number().required(),
            stock: Joi.number().required(),
            marca: Joi.string().min(2).max(40).required(),
            category: Joi.string().min(3).max(20).required(),
            description: Joi.string().min(2).max(80).required(),
            detalles: Joi.string().min(5).max(200).required(),
            delivery: Joi.string(),
            ageSince: Joi.number(),
            ageUntil: Joi.number(),
            img: Joi.string().pattern(new RegExp(/.(gif|jpeg|jpg|png)$/i))
        

        });

        const { error } = productSchema.validate(product);

        return error;
    }
}

export default ProductValidator;
