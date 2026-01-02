(() => {
  const basePath = document.currentScript?.getAttribute('src-path') || './'
  const cache = {}

  async function fetchSVG(src) {
    if (!cache[src]) {
      cache[src] = fetch(src).then(res => res.ok ? res.text() : null)
    }
    return cache[src]
  }

  class SVGIcon extends HTMLElement {
    static get observedAttributes() { return ['src'] }

    async updateIcon() {
      const iconName = this.innerHTML.trim()
      const src = this.hasAttribute('src')
        ? this.getAttribute('src')
        : `${basePath.replace(/\/$/, '')}/${iconName}.svg`

      const svgText = await fetchSVG(src)
      if (!svgText) return

      const template = document.createElement('template')
      template.innerHTML = svgText.trim()
      const svg = template.content.firstChild

      if (!(svg instanceof SVGElement)) return

      const style = getComputedStyle(this)
      const w = parseInt(style.width) || 0
      const h = parseInt(style.height) || 0
      if (w && h) {
        svg.setAttribute('width', w)
        svg.setAttribute('height', h)
      }

      this.innerHTML = ''
      this.appendChild(svg)
      this.applyColor()
    }

    applyColor() {
      const color = getComputedStyle(this).color
      this.querySelectorAll('*').forEach(el => {
        if (el.style) el.style.fill = color
      })
    }

    connectedCallback() { this.updateIcon() }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal && this.isConnected) this.updateIcon()
    }
  }

  if (!customElements.get('svg-icon')) {
    customElements.define('svg-icon', SVGIcon)
  }

  const onReady = () => {
    new MutationObserver(() => {
      document.querySelectorAll('svg-icon').forEach(icon => icon.applyColor())
    }).observe(document.documentElement, { attributes: true, subtree: true, childList: true })
  }

  if (document.readyState === 'complete') onReady()
  else window.addEventListener('load', onReady)
})()
