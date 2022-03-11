/* 商品尺码表组件 */
class GoodCodeTable {
  /**
   * 构造函数
   * @param {*} el 渲染的dom元素根节点
   * @param {*} options 设置参数
   * @param {*} roles 角色
   * @param {*} codes 尺码
   * @param {*} list 数据
   * @param {*} editPartCB 编辑部位回调函数
   */
  constructor (el, options = {
    roles: [],
    codes: [],
    list: [],
    editPartCB: function () {}
  }) {
    // 渲染根节点dom
    this.root = el
    // 组件配置参数
    this.options = options
    // 组件内编辑的数据
    this.data = {}
    // 回调函数绑定
    this.eventEditPart = this.options.editPartCB

    this.init()
    this.proxyEvent()
  }

  /**
   * 代理事件绑定
   */
  proxyEvent () {
    // 点击事件代理
    this.root.addEventListener('click', (e) => {
      let ev = e || window.event
      let target = ev.target || ev.srcElement
      let eventName = target.getAttribute('data-event')

      // 有绑定事件的
      if (eventName != null) {
        switch (eventName) {
          case 'eventEditPart':
            this[eventName](target.getAttribute('data-role'))
            break
          default:
            this[eventName]()
        }
      }
    }, false)
  }

  /**
   * 输出表格所填数据
   */
  getTableData () {
    return this.data
  }

  /**
   * 初始化组件
   */
  init () {
    this.renderHtml()
  }

  /** **********************************渲染方法**************************************** **/
  /**
   * 渲染组件html
   */
  renderHtml () {
    let html = `
<div class="top-box">
    <span class="roleName">妈妈款</span>
    <div class="btns-box">
        ${this.htmlCopyBtn()}
        ${this.htmlEditBtn()}
    </div>
</div>
<div class="table-box">
    ${this.htmlTable()}
</div>
 `
    this.root.innerHTML = html
  }

  /**
   * 生成一键赋值html
   * @returns html文本
   */
  htmlCopyBtn () {
    let html = `
<a href="javascript:;" class="btn-copy" data-event="eventCopyValue">一键同步度量方法/公差</a>
`
    return html
  }

  /**
   * 生成一键赋值html
   * @returns html文本
   */
  htmlEditBtn (index) {
    let html = `
<a href="javascript:;" class="btn-edit-part" data-event="eventEditPart" data-index="${index}">编辑部位</a>
`
    return html
  }

  /**
   * 生成table内容
   * @returns html文本
   */
  htmlTable () {
    let html = `
<table>
    <tr>
        <th>尺码/部位</th>
        <th>度量</th>
        <th>公差</th>
    </tr>
</table>
`
    return html
  }
  /** **********************************渲染方法 END**************************************** **/

  /** *******************************组件内部使用的方法************************************** **/

  /**
   * 一键同步度量方法/公差
   */
  eventCopyValue () {
    console.log('一键同步度量方法/公差')
  }

  /**
   * 编辑部位
   */
  //   eventEditPart () {
  //     console.log('编辑部位')
  //   }

  /** *******************************组件内部使用的方法 END******************************* **/
}

export default GoodCodeTable
