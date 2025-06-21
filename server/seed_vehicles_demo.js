const mongoose = require('mongoose');
const Vehicle = require('./models/vehicle');
const config = require('./config');

const vehicles = [
  { number: 'AA1234BX', type: 'Легковий', brand: 'Volkswagen', model: 'Passat', year: '2018-05-12', status: 'Робочий', responsible: 'Коваль Ігор' },
  { number: 'BB5678CH', type: 'Вантажний', brand: 'MAN', model: 'TGS', year: '2016-09-20', status: 'Потребує ремонту', responsible: 'Мельник Сергій' },
  { number: 'CC9101DE', type: 'Спецтехніка', brand: 'КРАЗ', model: '6322', year: '2015-03-15', status: 'Списаний', responsible: 'Омельчук Олександр' },
  { number: 'DD2345FG', type: 'Автобус', brand: 'Богдан', model: 'A092', year: '2017-07-30', status: 'Новий', responsible: 'Сидоренко Людмила' },
  { number: 'EE6789HI', type: 'Легковий', brand: 'Renault', model: 'Megane', year: '2020-10-05', status: 'Робочий', responsible: 'Демченко Павло' },
  { number: 'FF1122JK', type: 'Причіп', brand: 'Schmitz', model: 'Cargobull', year: '2014-04-01', status: 'Списаний', responsible: 'Шевчук Віталій' },
  { number: 'GG3344LM', type: 'Вантажний', brand: 'DAF', model: 'XF', year: '2019-02-11', status: 'Робочий', responsible: 'Гнатюк Максим' },
  { number: 'HH5566NO', type: 'Автобус', brand: 'Еталон', model: 'T121', year: '2021-06-17', status: 'Новий', responsible: 'Романюк Ірина' },
  { number: 'II7788PQ', type: 'Легковий', brand: 'Skoda', model: 'Octavia', year: '2019-12-22', status: 'Потребує ремонту', responsible: 'Кравченко Юлія' },
  { number: 'JJ9900RS', type: 'Спецтехніка', brand: 'ЗІЛ', model: '131', year: '2013-01-09', status: 'Списаний', responsible: 'Ткачук Іван' }
];

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(vehicles);
    console.log('Демо-транспортні засоби додано!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Помилка:', err);
    mongoose.disconnect();
  });
