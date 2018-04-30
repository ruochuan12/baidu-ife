// import san, { Component } from 'san';
import san from 'san';
// import styles from '../styles/index.css'; // css modules

class App extends san.Component {
    static template = `<div class="">hello {{name}}</div>`;
    // static template = `<div class="">hello {{name}}</div>`;

    initData() {
        console.log(this.initData);
        return {
            name: 'world',
            // styles, // 此处初始化时引入css modules
        };
    }
}

 export default App;