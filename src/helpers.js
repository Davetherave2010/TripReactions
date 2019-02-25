export function getWindowQueryValue (name) {
  const url = window.location.search
  const trucatedUrl = url.substring(1)
  const splitUrl = trucatedUrl.split('&')
  const keyValueSplitUrl = splitUrl.map((url) => url.split('=')).flat()

  const redirectIndex = keyValueSplitUrl.indexOf(name)

  if(redirectIndex !== -1) {
    return keyValueSplitUrl[redirectIndex + 1]
  }

  return null
}
