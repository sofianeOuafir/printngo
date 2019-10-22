export const numberToDistance = (number) => {
  if(number < 1) {
    return `${Math.round(number) * 1000} m`
  } else {
    return `${Math.round( number * 10 ) / 10} km`
  }
}