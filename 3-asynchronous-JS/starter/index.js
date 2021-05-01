const fs = require('fs');
const superagent = require('superagent')

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    if (err) return console.log(err.message)

    console.log(`Breed: ${data}`);

    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then(res => {
        if (err) return console.log(err.message)

        fs.writeFile('dog-img.txt', res.body.message, err => {
            if (err) return console.log(err.message)

            console.log("Random dog image save to file")
        })
    }).catch(err => console.log(err.message))
})