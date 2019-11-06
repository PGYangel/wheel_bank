import _ from 'lodash';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    var element = document.createElement('div');
    var btn=document.createElement('button');

    // Lodash，现在由此脚本导入
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML='CLICK ME';

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

