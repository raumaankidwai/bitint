const bi = {
	clean: (n) => {
		while (n[0] < 1) {
			n = n.slice(1);
		}
		
		return n;
	},
	
	eq: (n1, n2) => {
		for (var i = 0; i < Math.max(n1.length, n2.length); i ++) {
			if (n1[i] != n2[i]) {
				return false;
			}
		}
		
		return true;
	},
	
	gt: (n1, n2) => (b1 = bi.clean(n1)).length ? (b2 = bi.clean(n2)).length ? b1.length == b2.length ? bi.gt(b1.slice(1), b2.slice(1)) : b1.length > b2.length : true : false,
	gte: (n1, n2) => bi.eq(n1, n2) || bi.gt(n1, n2),
	
	lt: (n1, n2) => !bi.gte(n1, n2),
	lte: (n1, n2) => !bi.gt(n1, n2),
	
	add: (n1, n2) => {
		var b1 = n1.reverse();
		var b2 = n2.reverse();
		
		var b = [];
		var carry = 0;
		
		for (var i = 0; i < (Math.max(b1.length, b2.length) + 1); i ++) {
			var n = ~~b1[i] + ~~b2[i] + carry;
			
			b.push(n % 2);
			
			carry = n > 1;
		}
		
		return bi.clean(b.reverse());
	},
	
	sub: (n1, n2) => {
		var a = [bi.clean(n1), bi.clean(n2)].sort((a, b) => bi.gt(a, b) ? -1 : 1);
		
		var b1 = a[0].reverse();
		var b2 = a[1].reverse();
		
		var b = [];
		var take = 0;
		
		for (var i = 0; i < b1.length; i ++) {
			var n = ~~b1[i] - take - ~~b2[i];
			
			take = n < 0;
			n += 2 * take;
			
			b.push(n);
		}
		
		return bi.clean(b.reverse());
	}
};

module.exports = bi;
