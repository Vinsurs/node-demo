import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = { class: "container" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("template", null, [
    _createElementVNode("div", _hoisted_1, [
      _createElementVNode("p", null, "name: " + _toDisplayString(_ctx.user.name), 1 /* TEXT */)
    ])
  ]))
}