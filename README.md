## 项目简介

本项目中使用到的技术栈有 react， redux， node, webpack, websocket等。

1. React

React是Facebook内部的一个JavaScipt库，已于2013年开源，可用于创建web交互界面。React是现在前端领域应用非常广泛的框架之一。React最为人称道的就是他是一个专注于组件架构的类库。他的API较少，理念很简单，使用React可以快速写出和原生dom标签完全融合的自定义组件，而且可以高效渲染。

React 的几大特点：

    1. 前后端统一，SEO友好：用React开发写出的代码，既可以应用于客户端，又可以应用于服务端。Angular.js在开发webapp时会配合大量后端提供的数据接口从而达到动态、异步填充的特性，客户端渲染速度确实会快，体验也会更好，但同时也导致了互联网爬虫无法正确地检索到页面的真实数据而只能爬取到一些模板字段。开发者为了解决这个问题，通常情况下会在server端重写一套渲染逻辑专门供爬虫检索。而使用React的话则可以一定程度上改善这个问题，比如Express上就有一款视图引擎express-react-views可以实现服务端渲染React组件。

    2. 虚拟DOM：现有的前端体系中，碍于文件对象模型的树形实现，我们不得不面临一个现状，就是：JS很快，但DOM太慢。React为了解决这个问题在现有的两层模型中额外引入了一个过渡层，在浏览器端用JavaScript实现了一套DOM API，即：虚拟DOM。

    3. 组件化：虚拟DOM不仅带来了简单的UI开发逻辑，同时也带来了组件化开发的思想的开发趋势之一！React推荐以组件的方式去重新思考UI构成，将UI上每一个功能相对独立的模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成大的组件，最终完成整体UI的构建。如果说MVC的思想让你做到视图-数据-控制器的分离，那么组件化的思考方式则是带来了UI功能模块之间的分离。

2. Redux

Redux 是一个用来管理数据状态和 UI 状态的 JavaScript 应用工具。随着 JavaScript 单页应用（Single Page Applications, SPAs）开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态），Redux 被创造用来让 state 的更易于管理。

在 React 中，UI 以组件的形式来搭建，组件之间可以嵌套组合。但 React 中组件间通信的数据流是单向的，顶层组件可以通过 props 属性向下层组件传递数据，而下层组件不能向上层组件传递数据，兄弟组件之间同样不能。这样简单的单向数据流支撑起了 React 中的数据可控性。

Redux 提供了一个叫 store 的统一仓储库，组件通过 dispatch 将 state 直接传入 store ，不用通过其他的组件。并且组件通过 subscribe 从 store 获取到 state 的改变。store 就像一个管理 state 改变的“中间人”，组件之间的信息传递不必直接在彼此间进行，所有的 state 变化都通过 store 这唯一数据源。Redux中，state的状态是只读的，Redux 不允许应用直接修改 state，惟一改变 state 的方法就是触发 action，通过action执行相应的reduce，对state中的数据进行改变。


3. Webpack

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。


4. Websocket

WebSocket出现前我们实现推送技术，用的都是轮询，在特定的时间间隔，浏览器自动发出请求，将服务器的消息主动的拉回来，这种情况下，我们需要不断的向服务器发送请求，并且服务器不能主动向客户端推送数据。在这种情况下需要一种高效节能的双向通信机制来保证数据的实时传输，于是基于HTML5规范的WebSocket应运而生。一句话概括：WebSocket是HTML5下一种新的协议。它实现了浏览器与服务器全双工通信，能更好的节省服务器资源和带宽并达到实时通讯的目的。