const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');

// mogodb 연결
const uri = "mongodb+srv://Final_Poject:1234@cluster0.yrij7xu.mongodb.net/"; // 여기에 자신의 MongoDB URI 입력
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB에 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
  }
}
connectToMongoDB();
database = client.db('Final')
collection = database.collection('local')



// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());
// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/generate', (req, res) => {
        let { value1, value2, value3 } = req.body;
        value1 = parseInt(value1, 10);
        result = collection.findOne({상권_코드 : value1})
        .then(result =>{
            console.log(result)
            a = result.latitude;
            b = result.longitude;
            const generatedUrl = `https://new.land.naver.com/offices?ms=${a},${b},16&a=SG:SMS:GJCG:APTHGJ:GM:TJ&c=10&d=${value2}&e=RETAIL&g=${value3}`;
            res.redirect(`${generatedUrl}`);
        })
        

        // 나머지 코드...
    
        
    });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// #############################################
