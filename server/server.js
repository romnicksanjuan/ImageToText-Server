const express = require('express')
// const { createWorker } = require('tesseract.js');
const multer = require('multer');
const Tesseract = require('tesseract.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())




const upload = multer({ storage: multer.memoryStorage() });


app.post('/', upload.single('image'), (req, res) => {

  try {
    const imageBuffer = req.file.buffer;
    // Tesseract.recognize(
    //     imageBuffer,
    //     'eng',
    //     {
    //       logger: m => console.log(m)
    //     }
    //   ).then(({ data: { text } }) => {
    //     console.log(text);
    //     res.json(text)
    //   }).catch(err => {
    //     console.error(err);
    //   });


    Tesseract.recognize(imageBuffer)
      .then((result) => {
        console.log(result.data.text);
        res.json(result.data.text);
      });
  } catch (error) {
    console.log(error)
  }
})

app.get('/potaka', (req, res) => {
  res.json('potang ina mo')
})


app.listen(3000, () => {
  console.log('server is running')
})   