
/**
Addidtion Mimic
**/
function add(num1, num2){

    var result = 0;

	var digit = 1;

	var abit = num1 & digit;

	var bbit = num2 & digit;
	
	var carryer = (abit&bbit)<<1;
	
	result ^= abit^bbit^carryer;
	
	/**
	32-bit register
	**/
	var bitCount = 1;
	while(bitCount<32){	
		digit <<= 1;
		rbit = result & digit;
		abit = num1 & digit;
		bbit = num2 & digit;
		carryer = ((abit&bbit)|(abit&rbit)|(bbit&rbit))<<1;
		result ^= abit^bbit^carryer;	
		bitCount++;
	}
	
	return result;
}

/**
Subtraction Mimic
**/
function subtract(num1,num2){

	return add(num1,-num2);
}

/**
Multiplication Mimic
**/
function multiply(num1,num2){
	
	var multiplicand = num1;
	
	var multiplier = num2;
	
	var result = 0;
	
	/**
	32-bit register
	**/
	for(var bitCount = 0; bitCount < 33; bitCount++){ 
		if((1 & multiplier ) == 1){
			result = add(result, multiplicand);
		}
		multiplicand <<= 1;
		multiplier >>= 1;
	}
	
	return result;
}

/**
Division Mimic (positive supported)
**/
function divide(num1,num2){
	
	var dividend = num1;
	
	/**
	align max bit
	**/
	var divisor = num2;
	var alignCount = 0;
	while(divisor <= dividend){
		divisor <<= 1;
		++alignCount;
	}

	var reminder = dividend;
	
	var quotient = 0;

	for(var bitCount = 0; bitCount < alignCount+1; bitCount++){
		quotient <<= 1;
		reminder = subtract(reminder,divisor);
		if(reminder < 0){
			reminder = add(reminder,divisor);
			quotient |= 0;
		}else{
			quotient |= 1;
		}
		divisor >>= 1;
	}
	
	return {quotient,reminder};	
}
