import mongoose from 'mongoose';
const dbName = process.env.MONGODB_DB_NAME || 'octofit_db';
const connectionString = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`;
const db = mongoose.connection;
mongoose
    .connect(connectionString, { dbName })
    .then(() => {
    console.log(`Connected to ${dbName}`);
})
    .catch((error) => {
    console.error(`Error connecting to ${dbName}:`, error);
    process.exit(1);
});
db.on('error', console.error.bind(console, 'connection error:'));
export default db;
