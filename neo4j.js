import neo4jDriver from 'neo4j-driver';

// Create Driver
const driver = new neo4jDriver.driver("bolt://192.168.99.100:7687", neo4jDriver.auth.basic("neo4j", "neo"));

// Express middleware
module.exports = function(req, res, next) {
    req.driver = driver;
    next();
};