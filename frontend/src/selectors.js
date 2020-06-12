import * as R from 'ramda'

export const getPhoneById = (state, id) => R.prop(id, state.items.items)

export const getTotalBasketCount = basket => R.length(basket)

export const getTotalBasketPrice = basket => R.sum(basket)
