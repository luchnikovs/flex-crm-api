// Configurations

const dbUsername = 'Harvey';
const dbPassword = 'M892451m';
const dbName = process.env.NODE_ENV === 'test' ? 'billforward_test' : 'billforward';

module.exports = {
  dbUrl: `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-7rm8k.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  port: process.env.PORT || 5000
}