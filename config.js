// DB Config

const dbUsername = 'Harvey';
const dbPassword = 'M892451m';
const dbName = process.env.NODE_ENV === 'test' ? 'billforward_test' : 'billforward';

// Token Config

const tokenSecret = 'ac25f851ba5f74cd97a4a758eee9095fa41e30d198aae5b32e62244ff17eab38'
const tokenExp = '15m'

module.exports = {
  dbUrl: `mongodb+srv://${dbUsername}:${dbPassword}@cluster0-7rm8k.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  port: process.env.PORT || 5000,
  tokenSecret,
  tokenExp
}