// * 当 n === 0 时，返回 0；n === 1时，返回 1;
// * n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
// * n 不可大于10，否则抛错，因为 Node.js 的计算性能没那么强。
// * n 也不可小于 0，否则抛错，因为没意义。
// * n 不为数字时，抛错。
const fibonacci = (n) => {
  if (n > 10) throw new Error('n should <= 10')
  if (n < 0) throw new Error('n should > 0')
  if (typeof n !== 'number') throw new Error('n should be a Number')
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

if (require.main === module) {
  // 如果是直接执行 main.js，则进入此处
  // 如果 main.js 被其他文件 require，则此处不会执行。
  const n = process.argv[2]
  console.log(`fibonacci(${n}) is`, fibonacci(n))
}

exports.fibonacci = fibonacci