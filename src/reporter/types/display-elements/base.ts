import { merge } from 'lodash'
import { Apply } from '../../../cast'

export type PartialDisplayElement = Partial<DisplayElement>
export type DisplayElementInput = DisplayElement | PartialDisplayElement

export const Registry = new Map<string, typeof DisplayElement>()

export class DisplayElement {
  public name = ''
  public description = ''

  public options = {}
  public meta = {
    size: undefined,
  }

  kind = ''

  constructor (de: PartialDisplayElement = {}) {
    this.apply(de)
  }

  apply (de?: DisplayElement | PartialDisplayElement): void {
    if (!de) return

    Apply(this, de, String, 'name', 'description')

    if (de.options) {
      this.options = merge({}, this.options, de.options)
    }

    if (de.meta) {
      this.meta = merge({}, this.meta, de.meta)
    }
  }
}

