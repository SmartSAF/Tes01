import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

const config = {
  theme: 'dark',
  animate: true,
  snap: true,
  start: gsap.utils.random(0, 100, 1),
  end: gsap.utils.random(900, 1000, 1),
  scroll: true,
  debug: false,
}

const ctrl = new Pane({
  title: 'Config',
  expanded: false,
})

let items
let scrollerScrub
let dimmerScrub
let chromaEntry
let chromaExit

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.syncScrollbar = config.scroll
  document.documentElement.dataset.animate = config.animate
  document.documentElement.dataset.snap = config.snap
  document.documentElement.dataset.debug = config.debug
  document.documentElement.style.setProperty('--start', config.start)
  document.documentElement.style.setProperty('--hue', config.start)
  document.documentElement.style.setProperty('--end', config.end)

  if (!config.animate) {
    chromaEntry?.scrollTrigger.disable(true, false)
    chromaExit?.scrollTrigger.disable(true, false)
    dimmerScrub?.disable(true, false)
    scrollerScrub?.disable(true, false)
    gsap.set(items, { opacity: 1 })
    gsap.set(document.documentElement, { '--chroma': 0 })
  } else {
    gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) })
    dimmerScrub.enable(true, true)
    scrollerScrub.enable(true, true)
    chromaEntry.scrollTrigger.enable(true, true)
