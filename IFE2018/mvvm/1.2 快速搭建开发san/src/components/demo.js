class MyApp extends san.Component {
    static template = `
      <div>
        <label><input type="checkbox" value="errorrik" checked="{= online =}">errorrik</label>
        <label><input type="checkbox" value="otakustay" checked="{= online =}">otakustay</label>
        <label><input type="checkbox" value="firede" checked="{= online =}">firede</label>
        <br>{{online}}
      </div>
    `;
  
    initData() {
      return {
        online: ['errorrik', 'otakustay']
      };
    }
  }
  
  let myApp = new MyApp();
  myApp.attach(document.body);