import { Color } from './Color'
import { MMCQ } from './MMCQ'
export { preloadWasm } from './rust'

export { Color }

export interface MMCQOption {
  /**
   * Color count
   * @default 8
   */
  count: number
  /**
   * 1 - 8
   * @default 5
   * @deprecated Replace with the `colorDepth` option instead.
   */
  algorithm?: number
  /**
   * 1 - 8
   * @default 5
   */
  colorDepth: number
  /**
   * use Wasm, you also need specify the wasm path, see {@link MMCQOption.wasmPath }
   * @default false
   */
  useWebAssembly: boolean
  /**
   * Wasm path, ex. `/node_modules/mmcq.js/dist/mmcq_bg.wasm`
   *
   * If you have some issue with build processing, maybe you should copy `/node_modules/mmcq.js/dist/mmcq_bg.wasm` to assets directory, then specify the path.
   */
  wasmPath?: string
}

export async function mmcq(
  /**
   * image data
   */
  data: Uint8ClampedArray,
  option: Partial<MMCQOption> = {},
): Promise<Color[]> {
  const defaultOption: MMCQOption = {
    count: 8,
    colorDepth: 5,
    useWebAssembly: false,
  }

  const opt = Object.assign(defaultOption, option)

  opt.colorDepth = opt.algorithm || opt.colorDepth

  if (opt.useWebAssembly) {
    const r = await import('./rust')
    const colors = await r.mmcqjs(data, opt)
    return colors.map((n) => Color.formHex(n))
  } else {
    return new MMCQ(data, opt.colorDepth).getPalette(opt.count)
  }
}
