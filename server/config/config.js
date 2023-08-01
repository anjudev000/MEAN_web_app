//check env. if it is production env, NODE_ENV WILL BE REPLACED WITH THAT OR IF IT IS DEVELOPMENT WITH THAT
const env = process.env.NODE_ENV || "development"
//FETCH ENV config
const config = require('./config.json');
const envConfig = config[env]; 
//nodejs api is configured with the above config data. add env config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key])
