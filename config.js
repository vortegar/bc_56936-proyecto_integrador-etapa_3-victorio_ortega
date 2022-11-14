const PERSISTENCE_TYPES = {
    // TYPE_MEM: 'MEMORY',
    // TYPE_FILE: 'FILE SYSTEM',
    TYPE_MONGODB: 'MONGODB'
};

const config = {
    PORT: 8080,
    PERSISTENCE_TYPE: PERSISTENCE_TYPES.TYPE_MONGODB,

    MONGODB_CONNECTION_STR: 'mongodb+srv://Bootcamp:Bootcamp@cluster1.7fziphc.mongodb.net/test?retryWrites=true&w=majority',    
    MONGODB_TIMEOUT: 2000,  // Valor bajo para desarrollo
};

export {PERSISTENCE_TYPES, config as default};
