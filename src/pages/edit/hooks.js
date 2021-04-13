import {reactive, nextTick} from 'vue';

function getElementTop(element){
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null){
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export function useEditor() {
  const state = reactive({
    toolStyle: {},
    activeStyle: {},
    hoverStyle: {},
    isBottom: false,
    isTop: false,
    current: 0,
    containerHeight: 667,
    dragableComponents: []
  });

  const restStyle = (height, top, type) => {
    state[type] = {
      height,
      top: `${top}px`,
    };
    nextTick(() => {
      const toolND = document.getElementById('se-view-tools');
      const toolHeight = parseInt(getComputedStyle(toolND).height, 10);
      state.toolStyle = {
        top: `${top + 10 + toolHeight > state.containerHeight ? top - toolHeight + parseInt(height, 10) : top + 10}px`,
      };
    });
  }

  const eventInit = (selectCb) => {
    const componentsPND = document.getElementById('frame').contentWindow.document.getElementById('slider-view');

    componentsPND.addEventListener('click', (e) => {
      let node = e.target;
      while(node.tagName !== 'HTML') {
        let currentId = node?.getAttribute('id') || '';
        if (currentId.indexOf('coco-render-id-_component_') >= 0) {
          const top = getElementTop(node);
          const { height } = getComputedStyle(node);
          restStyle(height, top, 'activeStyle');
          const pids = Array.from(componentsPND.childNodes).map(nd => nd.getAttribute('id'))
          pids.forEach((id, index) => {
            if (id === currentId) {
              state.isTop = index === 0;
              state.isBottom = index === pids.length - 1;
              state.current = index;
              selectCb(index);
            }
          });
        }
        node = node.parentNode;
      }
    });
    componentsPND.addEventListener('mouseover', (e) => {
      let node = e.target;
      while(node.tagName !== 'HTML') {
        let currentId = node?.getAttribute('id') || '';
        if (currentId.indexOf('coco-render-id-_component_') >= 0) {
          try {
            const top = getElementTop(node);
            const { height } = getComputedStyle(node);
            restStyle(height, top, 'hoverStyle');
            const pids = Array.from(componentsPND.childNodes).map(nd => nd.getAttribute('id'))
            pids.forEach((id, index) => {
              if (id === currentId) {
                state.isTop = index === 0;
                state.isBottom = index === pids.length - 1;
                state.current = index;
              }
            })
          } catch (e) {
            // ignore
          }

        }
        node = node.parentNode;
      }
    });
  }

  const init = (index) => {
    const componentsPND = document.getElementById('frame')?.contentWindow.document.getElementById('slider-view');
    if (!componentsPND) return;
    const container = document.getElementById('frame')?.contentWindow.document.getElementsByTagName('html')[0]
    const containerHeight = Math.ceil(parseFloat(getComputedStyle(container).height) + componentsPND.offsetTop);
    state.containerHeight = containerHeight > 667 ? containerHeight : 667;
    if (index === -1) return;
    const node = componentsPND.childNodes[index];
    let currentId = node?.getAttribute('id') || '';
    const top = getElementTop(node);
    const { height } = getComputedStyle(node);
    restStyle(height, top, 'activeStyle');
    const pids = Array.from(componentsPND.childNodes).map(nd => nd.getAttribute('id'))
    pids.forEach((id, index) => {
      if (id === currentId) {
        state.isTop = index === 0;
        state.isBottom = index === pids.length - 1;
        state.current = index;
      }
    })
  }

  const getIndex = (y) => {
    const componentsPND = document.getElementById('frame')?.contentWindow.document.getElementById('slider-view');
    let total = 40;
    let index = 0;
    Array.from(componentsPND.childNodes).some((nd, i) => {
      try {
        total = total + parseInt(getComputedStyle(nd).height, 10);
        if (total > y) {
          index = i;
          return true;
        }
      } catch (e) {
        //
      }

      index = i;
      return false;
    });
    return index;
  }

  // 需要设置fixed布局的组件样式
  const setFixedStyle = (index) => {
    const componentsPND = document.getElementById('frame')?.contentWindow.document.getElementById('slider-view');
    state.dragableComponents = [];
    Array.from(componentsPND?.childNodes || []).forEach(nd => {
      if (nd.getAttribute('data-layout') === 'fixed') {
        try {
          const el = nd.childNodes[0];
          const {left, top, width, height} = getComputedStyle(el);
          state.dragableComponents.push({
            x: parseInt(left),
            y: parseInt(top),
            width: parseInt(width, 10),
            height: parseInt(height, 10),
            index
          });
        } catch (e) {
          //
        }

      }
    });
  }

  return {
    eventInit,
    init,
    editorState: state,
    getIndex,
    setFixedStyle,
  }
}
