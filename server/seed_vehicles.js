const mongoose = require('mongoose');
const Vehicle = require('./models/vehicle');
const config = require('./config');

const vehicles = [
  { number: 'AA1234BB', type: 'Легковий', brand: 'Toyota', model: 'Corolla', year: '2020-05-10', status: 'Новий', responsible: 'Іваненко Іван' },
  { number: 'BC5678CD', type: 'Вантажний', brand: 'MAN', model: 'TGS', year: '2018-03-15', status: 'Робочий', responsible: 'Петренко Петро' },
  { number: 'CE9012DE', type: 'Автобус', brand: 'Богдан', model: 'A092', year: '2017-09-01', status: 'Робочий', responsible: 'Сидоренко Сидір' },
  { number: 'DA3456EF', type: 'Спецтехніка', brand: 'JCB', model: '3CX', year: '2019-11-20', status: 'Робочий', responsible: 'Коваленко Костянтин' },
  { number: 'EB7890FG', type: 'Причіп', brand: 'Krone', model: 'SD', year: '2016-07-12', status: 'Потребує ремонту', responsible: 'Мельник Микола' },
  { number: 'FA2345GH', type: 'Легковий', brand: 'Renault', model: 'Megane', year: '2021-02-28', status: 'Новий', responsible: 'Гриценко Григорій' },
  { number: 'GH6789IJ', type: 'Вантажний', brand: 'Volvo', model: 'FH', year: '2015-04-18', status: 'Списаний', responsible: 'Шевченко Сергій' },
  { number: 'HI0123JK', type: 'Автобус', brand: 'Еталон', model: 'А081', year: '2014-08-05', status: 'Потребує ремонту', responsible: 'Бондаренко Богдан' },
  { number: 'IJ4567KL', type: 'Спецтехніка', brand: 'Caterpillar', model: '428F', year: '2019-12-30', status: 'Робочий', responsible: 'Данилюк Данило' },
  { number: 'KL8901MN', type: 'Причіп', brand: 'Schmitz', model: 'SCS', year: '2013-06-22', status: 'Списаний', responsible: 'Романенко Роман' }
];

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log('Транспортні засоби додано!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Помилка:', err);
    mongoose.disconnect();
  });
