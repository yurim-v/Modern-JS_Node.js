// 2024.06.13

let a = 1;

console.log(a ?? null); // a = 1
console.log((a !==null && a !==undefined) ? a : null); // a = 1
console.log((a ?? null) === ((a !==null && a !==undefined) ? a : null));


a = null;
console.log(a ?? null); // a = null
console.log((a !==null && a !==undefined) ? a : null);  // a = null
console.log((a ?? null) === ((a !==null && a !==undefined) ? a : null));
