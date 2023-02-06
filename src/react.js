let currentComponent = -1
let hooks = [];

let vdomRoot = null
let elRoot = null

export const useState = (initialState) => {
  const position = currentComponent;
  if (hooks.length === position) {
    hooks.push(typeof initialState === 'function' ? initialState() : initialState);
  }
  return [
    hooks[position],
    (newState) => {
      render(vdomRoot, elRoot)
      hooks[position] = newState;
    }
  ]
}

export class Component {

}

export const diffingUpdate = (parent, nextNode, previousNode, parentIndex = 0) => {
  // Node가 string일 때 업데이트해 줍니다
  if (typeof nextNode === "string" && typeof previousNode === "string") {
    // 만약 해당 문자열이 동일하다면, replace해 줄 이유가 없습니다.
    if (nextNode === previousNode) {
      return;
    }
    return parent.replaceChild(
      renderRealDOM(nextNode),
      parent.childNodes[parentIndex]
    )
  }

  // nextNode와 previousNode의 모든 자식 태그를 순회하며 diffingUpdate 함수를 반복해 줍니다.
  for (const [index] of nextNode.children.entries()) {
    diffingUpdate(
      parent.childNodes[parentIndex],
      nextNode.children[index],
      previousNode.children[index],
      index
    )
  }
}

const renderRealDOM = (vdom) => {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom)
  }
  if(!vdom) {
    return undefined
  }
  const dom = document.createElement(vdom.tagName)
  if (vdom.props) {
    Object.keys(vdom.props).forEach((propName) => {
      const propValue = vdom.props[propName]
      dom.setAttribute(propName, propValue)
    })
  }
  vdom.children.map(renderRealDOM).forEach((node) => {
    dom.appendChild(node)
  })
  return dom
}

export const render = (() => {
  let prevDom = null
  return (vdom, root) => {
    // vdomRoot = vdom
    // elRoot = root
    if (prevDom === null){
      prevDom = vdom
    }
    // diffing algorithm
    root.appendChild(renderRealDOM(vdom))
  };
})();

export const createElement = (tagName, props, ...children) => {
  if (typeof tagName !== 'function') {
    return { tagName, props, children }
  }
  if (tagName.prototype instanceof Component) {
    const component = new tagName({...props, ...children})
    return component.render()
  }
  currentComponent++;
  return tagName.apply(null, [props, ...children])
}
