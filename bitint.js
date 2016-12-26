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
	
	gt: (n1, n2) => {
		var b1 = clean(n1);
		var b2 = clean(n2);
		
		if (!b1.length) {
			return false;
		}
		
		if (!b2.length) {
			return true;
		}
		
		if (b1.length == b2.length) {
			return bi.gt(b1.slice(1), b2.slice(1));
		}
		
		return b1.length > b2.length;
		
		return b1.length ? b2.length ? b1.length == b2.length ? bi.gt(b1.slice(1), b2.slice(1)) : b1.length > b2.length : true : false;
	},
	
	add: (n1, n2) => {
		var b1 = n1.reverse();
		var b2 = n2.reverse();
		
		var b = [];
		var carry = 0;
		
		for (var i = 0; i < (Math.max(b1.length, b2.length) + 1); i ++) {
			var n = ~~b1[i] + ~~b2[i] + carry;
			
			b.push(n % 2);
			
			carry = +(n > 1);
		}
		
		return bi.clean(b.reverse());
	},
	
	sub: (n1, n2) => {
		var b1 = n1.reverse();
		var b2 = n2.reverse();
		
		var b = [];
		var take = 0;
		
		for (var i = 0; i < b1.length; i ++) {
			var n = ~~b1[i] - take - ~~b2[i];
			
			if (n < 0) {
				n += 2;
				take = 1;
			}
			
			b.push(n);
		}
		
		return bi.clean(b.reverse());
	}
};
