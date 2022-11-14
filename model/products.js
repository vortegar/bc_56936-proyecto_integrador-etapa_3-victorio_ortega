import config, {PERSISTENCE_TYPES} from '../config.js';
import ProductModelMongoDB from '../model/products-mongodb.js';
// import ProductModelMem from '../model/products-mem.js';
// import ProductModelFile from '../model/products-fs.js';

class ProductModel {
    static get(type) {
        console.log(`#### Persistencia -> ${config.PERSISTENCE_TYPE || 'por defecto'} ####`);
        switch (type) {
            case PERSISTENCE_TYPES.TYPE_MONGODB:
                return new ProductModelMongoDB();
            default:
                return new ProductModelMongoDB();
        }
    }
}

export default ProductModel;
