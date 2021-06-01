
const fs = require('fs');


/////////// VARIABLES ///////////

const inputFolder = 'input';
const outputFolder = 'output';
const modifiersFile = 'modifiers.txt';
const replaceWord = "naperville";


// for each line in a txt file, copy a file and name it using the line in the txt file

copyByModifiers(inputFolder, outputFolder, modifiersFile);

///// reads lines of a .txt file and copyAll for each line /////
function copyByModifiers (i, o, m) {
	fs.readFile(m, 'utf8', (err, data) => {
		if (err) throw err;
		let modifierRows = data.split(/\r?\n/);
		modifierRows.forEach (modifier => {
			copyAll(i, o, modifier);
		});
	});
}

///// copies all files in a folder and copies them with a modifier to another folder /////
function copyAll (i, o, m) {
	fs.readdir(i, (err, files) => {
		if (err) throw err;
		files.forEach(file => {
			const source = i + '/' + file;
			const destination = o + '/' +  file.split('.')[0].replace(replaceWord, m)+ '.' + file.split('.')[1];
			copy(source, destination);
		});
	});
}

///// copies a file (source to destination) /////
function copy (s, d) {
	fs.copyFileSync(s, d, (err) => {
		if (err) throw err;
	});
}