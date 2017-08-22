import { db } from '../models';
let DB = db.models;

var lucySongs = [
	{
		title: 'O sole mio',
		duration: '3:21',
		date_of_release: '1990',
		album_title: 'Three Tenors in Concert',
		artistId: ''
	},
	{
		title: "Nessun dorma",
		duration: "3:21",
		date_of_release: "1990",
		album_title: "Three Tenors in Concert",
		artistId: ""
	}
];


var managerCreate = function() {
	return DB.Manager.create({
    name: 'Ricky Bobby',
    email: 'rbobby@gmail.com',
    office_number: '516-877-0304',
    cell_phone_number: '718-989-1231',
	})
	.then(artistCreate)
	.then(adCreate(1))
};

var artistCreate = function(manager) {
	return DB.Artist.create({
    name: 'Luciano Pavarotti',
    photoUrl: 'http://img.informador.com.mx/biblioteca/imagen/677x508/811/810055.jpg',
    nationality: 'Italiano',
    instrument: 'Voice',
    home_address: '1 Strada Roma',
    managerId: manager.id
  }).then(function(artist) {
  	lucySongs.forEach(function(song) {
  		song.artistId = artist.id;
  	});
  	DB.Song.bulkCreate(lucySongs);
  });
};

var adCreate = function(manager) {
	return DB.Ad.create({
		headline: "Check out my ad!",
		url: "www.fakedoors.com",
		managerId: manager.id
	});
};

var songCreate = function() {
	return DB.Song.create({
	    title: 'The Best Song Ever',
	    duration: '3:31',
	    date_of_release: '7/13/2015',
	    album_title: 'Best Album Ever'
	})
};

managerCreate()
.then(songCreate)
.then(function() {
	process.exit();
});