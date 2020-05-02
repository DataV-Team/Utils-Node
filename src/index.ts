// eslint-disable-next-line
export function getCmdParams(): any {
  // eslint-disable-next-line
  return process.argv.slice(2).reduce((params: any, param) => {
    const [key, val] = param.split('=')
    params[key] = val

    return params
  }, {})
}
