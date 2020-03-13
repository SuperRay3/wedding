const formateDate = (date, fmt = 'yyyy-MM-dd') => {
  if (!date) {
    return ''
  }

  const _date = new Date(date)
  let _fmt = fmt
  const o = {
    'M+': _date.getMonth() + 1,
    'd+': _date.getDate(),
    'h+': _date.getHours(),
    'm+': _date.getMinutes(),
    's+': _date.getSeconds()
  }
  if (/(y+)/.test(_fmt)) {
    _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return _fmt
}

module.exports = {
  formateDate
}