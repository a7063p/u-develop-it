const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database');

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRoutes);
// ===========================================//

// =========Catch Error - Must go last========================//
//  Default response for any other request (not found) Catch all

app.use((req,res) => {
    res.status(404).end()
});

// ===========Listener=========================//
// Start server after DB connection - IMPORTANT
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
    });
});
