export function session (key, value) {
  if (value || value === '') {
    return sessionStorage.setItem(key, JSON.stringify(value))
  }
  return JSON.parse(sessionStorage.getItem(key))
}

export const cnReg = /^[\u4e00-\u9fa5]+$/g // 识别汉字