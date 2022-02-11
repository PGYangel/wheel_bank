let tempEle = document.createElement('template');
tempEle.innerHTML = `
<style>
    /* :host设置模板根节点样式 */
    :host {
        background: #ccc;
        display: block;
        width: 450px;
        min-height: 180px;
    }

    .image {
        float: left;
    }

    .right {
        float: left;
        margin-left: 10px;
    }

    .button {
        margin-top: 5px;
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 3px;
    }
</style>
<img src="img/img.jpg" alt="" class="image">
<div class="right">
    <p class="name"></p>
    <slot name="slot1"></slot>
    <button class="button" id="button">点击按钮</button>
    <slot name="slot2"></slot>
</div>
<div id="temp" class="temp"></div>
`;

let tempEle2 = document.createElement('template');
tempEle2.innerHTML = `
<p>切换</p>
<button class="button2" id="button2">点击按钮</button>
`

let isShow = false

class UserCard extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({
            mode: 'closed'
        })
        // let tempEle = document.getElementById('userCardTemplate')
        let content = tempEle.content.cloneNode(true)

        // 属性传值
        content.querySelector('.name').innerText = this.getAttribute('name')
        shadow.appendChild(content);

        // 监听事件
        this.$button = shadow.querySelector('.button');
        this.$button.addEventListener('click', () => {
            console.log('aaa')
            let content2 = tempEle2.content.cloneNode(true)
            let temp = shadow.getElementById('temp')
            if (isShow) {
                let bt2 = shadow.getElementById('button2')
                bt2.removeEventListener('click', add, false)
                temp.innerHTML = ''
                isShow = false
            } else {
                temp.appendChild(content2)
                isShow = true
                let bt2 = shadow.getElementById('button2')
                bt2.addEventListener('click', add, false)
            }
        });
    }
    connectedCallback() {
        console.log('当自定义元素第一次被连接到文档DOM时被调用')
    }
    disconnectedCallback() {
        console.log('当自定义元素与文档DOM断开连接时被调用')
    }
    adoptedCallback() {
        console.log('当自定义元素被移动到新文档时被调用')
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('当自定义元素的一个属性被增加、移除或更改时被调用')
    }
}

window.customElements.define('user-card', UserCard)

function add() {
    console.log('bbb')
}


function btClick() {
    let b = document.getElementById('button')
    // 读取不了里面的内容
    console.log(b)
}