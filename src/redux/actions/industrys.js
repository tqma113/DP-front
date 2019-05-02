import { Industrys } from '../states'

const getSetIndustrysAction = (industrys) => {
  return {
    type: Industrys.setIndustrys,
    industrys
  }
}

export {
  getSetIndustrysAction
}
