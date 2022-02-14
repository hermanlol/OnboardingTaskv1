const e = React.createElement
const { Button } = semanticUIReact

// ... Other JS code ...

const domContainer = document.querySelector('#like_button_container')

// 💡 This example is simplied to use React without JSX
//    https://reactjs.org/docs/react-without-jsx.html
ReactDOM.render(e(Button, { primary: true }, 'Hello world!'), domContainer)