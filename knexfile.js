module.exports = {

 development: {
   client: 'pg',
   connection: 'postgres://localhost/puppies'
 },

 production: {
   client: 'pg',
   connection: process.env.DATABASE_URL
 }
};
