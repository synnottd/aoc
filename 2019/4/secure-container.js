class Slow {
	lower;
	upper;
	number;
	constructor(lower = 193651, upper = 649729) { this.lower = lower; this.upper = upper; this.number = Array.from(String(lower), Number)}

	countOk = 0;

	inc = (digit = 5) => {
		this.number[digit]++;
		if (this.number[digit] === 10) {
			this.number[digit] = 0;
			this.inc(digit - 1);
		} else {
			this.lower++;
		}
	}

	inPuzzleRange = () => this.lower < this.upper;

	hasDouble = () => {
		let map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.number.forEach(digit => map[digit]++);
		return map.includes(2);
	}

	increases = () => this.number.reduce((acc, curr) => acc !== false && acc <= curr ? curr : false, true) !== false;

	compute = () => {
		while(this.inPuzzleRange()) {
			if(parseInt(this.number.join(''), 10) !== this.lower) {

			}
			if (this.hasDouble() && this.increases()) {
				this.countOk++;
				console.log(this.number);
			}
			this.inc();
		}
		return this.countOk;
	}
}

const x = new Slow();
const y = x.compute();
console.log(y);