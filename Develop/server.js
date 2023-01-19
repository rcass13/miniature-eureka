//dependencies
const fs = require('fs');
const util = require('util');

const path = require('path');
const apiRoutes = require ('./routes/api.routes')
const htmlRoutes = require ('./routes/html.routes')

//set up express
const express = require ('express')
const app = express();
const PORT = process.env.PORT || 3001;


// Helper method for generating unique ids
const uuid = require('./helpers/uuid'); 
// const { readFromFile, readAndAppend } = require('./helpers/fsUtils');



//get css and js files
app.use(express.static('public'));


//middleware parsing JSON
// app.use(require('./routes'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// // GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// // GET Route for retrieving all the tips
// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json','utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//           const parsedData = JSON.parse(data);
//           res.json(parsedData);
//           //   parsedData.push(content);
//           //   writeToFile(file, parsedData);
//       }
//     });
// });

// PORT

app.listen(PORT,() => {

    console.log(`App listening on PORT ${PORT}`);

})
 
// module.exports = router;
module.exports = app;