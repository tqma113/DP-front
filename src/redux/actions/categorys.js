import { Categorys } from '../states'

const getSetCategorysAction = (categorys) => {
  return {
    type: Categorys.setCategorys,
    categorys
  }
}

export {
  getSetCategorysAction
}
