

<script>

/**
Adder Simulation
**/

function add(a, b){

	var digit = 1;

	var abit = a & digit;

	var bbit = b & digit;
	
	var result = 0;
	
	var carryer = (abit&bbit)<<1;
	
	result ^= abit^bbit^carryer;
	
	while(digit<a||digit<b){
		
		digit <<= 1;
		rbit = result & digit;
		abit = a & digit;
		bbit = b & digit;
		carryer = ((abit&bbit)|(abit&rbit)|(bbit&rbit))<<1;
		result ^= abit^bbit^carryer;

	}
	
	return result;
}


</script>
