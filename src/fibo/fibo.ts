export function fibo(n: number):bigint{
  if(n<2){
    return BigInt(n)
  }else{
    let f_1 = 0n, f = 1n;
    for(
      let i = 1;
      i!=n;
      i++
    ){
      const _f = f;
      f = f_1 + f;
      f_1 = _f;
    }

    return f;
  }
}
