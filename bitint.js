class BitInt {
	constructor (bits) {
		this.bits = bits;
	}
	
	static add (n1, n2) {
		var b1 = n1.bits.reverse();
		var b2 = n2.bits.reverse();
		
		var b = [];
		var carry = 0;
		
		for (var i = 0; i < (Math.max(b1.length, b2.length) + 1); i ++) {
			var n = ~~b1[i] + ~~b2[i] + carry;
			
			b.push(n % 2);
			
			carry = +(n > 1);
		}
		
		return b.reverse();
	}
}
