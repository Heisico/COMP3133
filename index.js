const fs = require('fs');
const csv = require('csv-parser');

// this function deletes the files if they already exist
function deleteFilesIfExist() {
  if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt');
  }
  if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt');
  }
}

// this function filters and write data to files
function filterAndWriteData() {
  const canadaData = [];
  const usaData = [];

  // this reads and process the CSV file
  fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.country.toLowerCase() === 'canada') {
        canadaData.push(row);
      } else if (row.country.toLowerCase() === 'united states') {
        usaData.push(row);
      }
    })
    .on('end', () => {
    
      fs.writeFileSync('canada.txt', 'country,year,population\n');
      canadaData.forEach((row) => {
        fs.appendFileSync('canada.txt', `${row.country},${row.year},${row.population}\n`);
      });

      
      fs.writeFileSync('usa.txt', 'country,year,population\n');
      usaData.forEach((row) => {
        fs.appendFileSync('usa.txt', `${row.country},${row.year},${row.population}\n`);
      });

      console.log('Data has been written to canada.txt and usa.txt');
    });
}

// this runs the functions
deleteFilesIfExist();
filterAndWriteData();
