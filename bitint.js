const copy = n => JSON.parse(JSON.stringify(n));

const reverse = n => copy(n).reverse();

const bi = {
	toBitInt: (n) => {
		var k = Math.floor(Math.log2(n));
		var b = [];
		
		for (var i = k; i > -1; i --) {
			var m = 1 << i;
			
			b.push(n >= m);
			n -= m * (n >= m);
		}
		
		return b;
	},
	fromBitInt: (n) => {
		var k = 0;
		
		for (var i = 0; i < n.length; i ++) {
			k += n[i] * (1 << (n.length - i - 1));
		}
		
		return k;
	},
	
	clean: (n) => {
		var k = copy(n);
		
		if (Number.isInteger(k)) {
			k = bi.toBitInt(k);
		}
		
		while (k[0] < 1) {
			k = k.slice(1);
		}
		
		return k;
	},
	
	complement: (n) => bi.clean(n).map((e) => (1 - e)),
	
	eq: (n1, n2) => {
		var b1 = bi.clean(n1);
		var b2 = bi.clean(n2);
		
		if (b1.length != b2.length) {
			return false;
		}
		
		for (var i = 0; i < Math.max(b1.length, b2.length); i ++) {
			if (b1[i] != b2[i]) {
				return false;
			}
		}
		
		return true;
	},
	
	isOdd: (n) => reverse(n)[0],
	isEven: (n) => !bi.isOdd(n),
	
	inc: (n) => bi.add(n, [1]),
	dec: (n) => bi.sub(n, [1]),
	
	lshift: (n) => n.concat([0]),
	rshift: (n) => n.slice(0, -1),
	
	sq: (n) => bi.mult(n, n),
	
	rand: (b) => {
		var r = [];
		
		for (var i = 0; i < b; i ++) {
			r.push(Math.round(Math.random()));
		}
		
		return r;
	},
	
	randlte: (n) => {
		var b = bi.clean(n);
		var k;
		
		while (bi.gt(k = bi.rand(b.length), b));
		
		return k;
	},
	
	isPrime: (n) => {
		if (bi.lt([1, 0])) {
			return false;
		}
		
		if (bi.lt([1, 0, 0])) {
			return true;
		}
		
		if (bi.isEven(n)) {
			return false;
		}
		
		var s = [0];
		var d = bi.dec(n);
		
		while (bi.isEven(d)) {
			d = bi.rshift(d);
			s = bi.inc(s);
		}
		
		for (var i = 0; i < 64; i ++) {
			
		}
	},
	
	gt: (n1, n2) => (b1 = bi.clean(n1)).length ? (b2 = bi.clean(n2)).length ? b1.length == b2.length ? bi.gt(b1.slice(1), b2.slice(1)) : b1.length > b2.length : true : false,
	gte: (n1, n2) => bi.eq(n1, n2) || bi.gt(n1, n2),
	
	lt: (n1, n2) => !bi.gte(n1, n2),
	lte: (n1, n2) => !bi.gt(n1, n2),
	
	add: (n1, n2) => {
		var b1 = reverse(n1);
		var b2 = reverse(n2);
		
		var b = [];
		var carry = 0;
		
		for (var i = 0; i < (Math.max(b1.length, b2.length) + 1); i ++) {
			var n = ~~b1[i] + ~~b2[i] + carry;
			
			b.push(n % 2);
			
			carry = n > 1;
		}
		
		return bi.clean(reverse(b));
	},
	
	sub: (n1, n2) => {
		var a = [bi.clean(n1), bi.clean(n2)].sort((a, b) => bi.gt(a, b) ? -1 : 1);
		
		var b1 = reverse(a[0]);
		var b2 = reverse(a[1]);
		
		var b = [];
		var take = 0;
		
		for (var i = 0; i < b1.length; i ++) {
			var n = ~~b1[i] - take - ~~b2[i];
			
			take = n < 0;
			n += take << 1;
			
			b.push(n);
		}
		
		return bi.clean(reverse(b));
	},
	
	mult: (n1, n2) => reverse(n2).map((n, i) => n ? n1.concat(Array(i).fill(0)) : []).reduce((a, b) => bi.add(a, b)),
	
	divbase: (n1, n2) => {
		var n = [n1[0]];
		var r = [];
		
		for (var i = 1; i < (n1.length + 1); i ++) {
			var k = bi.gte(n, n2);
			
			r.push(k);
			
			n = bi.sub(n, k ? n2 : []).concat([n1[i]]);
		}
		
		return [r, bi.rshift(n)];
	},
	
	intdiv: (n1, n2) => bi.divbase(n1, n2)[0],
	mod: (n1, n2) => bi.divbase(n1, n2)[1],
	
	lpm: (n, p, m) => {
		if (!p.length) {
			return 1;
		}
		
		var a = bi.clean(n);
		var b = bi.clean(p);
		var c = bi.clean(m);
		
		a = bi.mod(a, c);
		
		if (bi.eq(b, [1])) {
			return a;
		}
		
		if (bi.isEven(b)) {
			return bi.mult(a, bi.mod(bi.lpm(bi.sq(a), bi.rshift(bi.dec(b)), c), c));
		}
		
		return bi.mod(bi.lpm(bi.sq(a), bi.rshift(b), c), c);
	},
};

module.exports = bi;
