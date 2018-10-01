const checksum = input => {
	input = input.trim();
	if (input.length > 7) return 'INVALID INPUT';
	if (input.toUpperCase().match(/[A-Z]{1,3}/g).length > 1)
		return 'INVALID INPUT';
	let letters = input.toUpperCase().match(/^[A-Z]{1,3}/g)[0];
	if (letters.length !== 2) {
		letters = letters.length === 3 ? letters.slice(1) : letters;
	}
	let letterValue = letters.split('').map(i => i.charCodeAt() - 64);
	if (letterValue.length !== 2) letterValue.unshift(0);
	let numbers = input.match(/[0-9]{1,4}/g)[0];
	while (numbers.length < 4) numbers = '0' + numbers;
	let numberValue = numbers.split('').map(i => parseInt(i));
	const sixDigit = [...letterValue, ...numberValue];
	const fixedNumbers = [9, 4, 5, 4, 3, 2];
	const remainder =
		sixDigit
			.map((i, index) => i * fixedNumbers[index])
			.reduce((a, b) => a + b) % 19;
	const checkLetters = [
		'A',
		'Z',
		'Y',
		'X',
		'U',
		'T',
		'S',
		'R',
		'P',
		'M',
		'L',
		'K',
		'J',
		'H',
		'G',
		'E',
		'D',
		'C',
		'B'
	];
	return `${input.toUpperCase()}${checkLetters[remainder]}`;
};

const calculate = () => {
	try {
		const result = checksum(document.getElementById('input').value);
		document.getElementById('result').textContent = result;
	} catch (e) {
		document.getElementById('result').textContent = 'INVALID INPUT';
	}
};

const input = document.getElementById('input');
input.addEventListener('keydown', e => {
	if (e.keyCode === 13) document.getElementById('calculate').click();
});
