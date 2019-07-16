;(function () {
  const oWrap = document.getElementById('wrap')
  const clds = oWrap.querySelectorAll('div')
  const oScore = document.getElementById('score')

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      case 37:
        // left
        run([0, 1, 2, 3])
        run([4, 5, 6, 7])
        run([8, 9, 10, 11])
        run([12, 13, 14, 15])
        create()
        setScore()
        break
      case 38:
        // top
        run([0, 4, 8, 12])
        run([1, 5, 9, 13])
        run([2, 6, 10, 14])
        run([3, 7, 11, 15])
        create()
        setScore()
        break
      case 39:
        // right
        run([3, 2, 1, 0])
        run([7, 6, 5, 4])
        run([11, 10, 9, 8])
        run([15, 14, 13, 12])
        create()
        setScore()
        break
      case 40:
        // bottom
        run([12, 8, 4, 0])
        run([13, 9, 5, 1])
        run([14, 10, 6, 2])
        run([15, 11, 7, 3])
        create()
        setScore()
        break
    }
  }

  // 设置分数
  function setScore () {
    const score = Array.from(clds)
      .map(e => Number(e.innerHTML))
      .reduce((cur, pre) => cur + pre, 0)
    oScore.innerHTML = score
  }

  // 保存上一步的数据
  let pre_vals

  function create () {
    const random = Math.floor(Math.random() * clds.length)
    // console.log(random)
    const val = [2]
    // 如果都有值则不创建,否则这里容易死循环
    if (Array.from(clds).filter(c => c.innerHTML).length === clds.length) {
      console.log('这里不再创建')
      if (isOver()) {
        if (window.confirm('游戏结束，是否继续')) {
          reset()
        }
      }
      return
    }
    if (clds[random].innerHTML) {
      // 如果有值再次创建,
      return create()
    }
    // 随机创建一个值
    clds[random].innerHTML = val[Math.floor(Math.random() * val.length)]
    // 设置用于比较
    pre_vals = JSON.stringify(Array.from(clds).map(e => e.innerHTML))
  }

  init()
  setScore()
  // 初始化创建几次
  function init () {
    for (let i = 0; i < 3; i++) {
      create()
    }
  }

  function isOver () {
    const next_vals = JSON.stringify(Array.from(clds).map(e => e.innerHTML))
    return pre_vals === next_vals
  }

  function reset () {
    Array.from(clds).forEach(el => {
      el.innerHTML = ''
    })
    init()
  }

  function getNewArr (arr) {
    return _2048([
      Number(clds[arr[0]].innerHTML),
      Number(clds[arr[1]].innerHTML),
      Number(clds[arr[2]].innerHTML),
      Number(clds[arr[3]].innerHTML)
    ])
  }

  function run (arr) {
    const newArr = getNewArr(arr)
    if (arr.toString() === newArr.toString()) {
      // 没变化
      return
    }
    // console.log(newArr)
    newArr.forEach((item, index) => {
      // 设置值
      clds[arr[index]].innerHTML = item === 0 ? '' : item
    })
  }

  function _2048 (arr) {
    // [2,2,0,2] => [4,2,0,0]
    // 返回一个新数组
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
      // 如果当前节点存在值，
      if (arr[i] && arr[i] !== 0) {
        let j = i + 1
        // 如果他两相等
        if (arr[i] === arr[j]) {
          // 这个时候将第i个的值赋为他两相加
          newArr.push(arr[i] + arr[j])
          i = j
        } else {
          newArr.push(arr[i])
        }
      }
    }

    // 补0
    arr.forEach((e, index) => {
      if (newArr[index] === undefined) {
        newArr[index] = 0
      }
    })
    return newArr
  }
})()
