// define & instantiate express
const express = require('express');
const path = require('path'); // node built in function
const app = express();

const logger = require('./middleware/logger');

// app.use(logger);

// create a route
// app.get('/', (req, res) => {
//   //   res.send('<h1>Good Job Patrick</h1>');
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/* create a static folder
    By using the middeleware express.static, we are telling express
    that all files that belong to the folder "public" are static
    files that we can serve. This includes images, css etc.

    Rather then typing a lot of app.get for each endpoint of static files,
    it is automatically done for us.

    so if the public folder has a file about.html.. by typing on the 
    browser /about.html it will automatically serve that file. 

*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // express middleware that takes care of converting objects to json file

//create a route
// middlewares are functions that has access to the request and response.

app.use('/api/members', require('./routes/api/members'));

// create a port
const PORT = process.env.PORT || 5000;

// listen to the port
app.listen(PORT, () => console.log(`The server is running in port ${PORT}`));
