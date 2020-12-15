// should 和 expect 区别

/**
 * should 是扩展了Object.prototype，并提供了链式调用，提供了侵入性
 * expect 是链式调用的起点
 */

/**
 * 常用语法
 */

/**
 * not 取反   expect("some string").to.not.equal("Other string")
 *
 * deep 用于对象比较   expect({ name:"peng" }).to.deep.equal({ name:"peng" })
 *
 * any 有其中之一  expect({ name:"peng" }).to.have.any.keys("name","age")
 *
 * all 全部包含    expect({ name:"peng" }).to.have.all.keys("name","age")
 *
 * ok  值 true/false  expect("everything").to.be.ok  expect(undefined).to.be.ok
 *
 * above 值在某阈值之上   expect([1,2,3]).to.have.length.above(2)
 */
