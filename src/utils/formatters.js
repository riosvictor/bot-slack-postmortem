function getStringDate(epochTime){
  if (epochTime){
    const d = new Date(Number(epochTime) * 1000)
    return `${String(d.getDate()).padStart(2,'0')
      }/${String(d.getMonth()+1).padStart(2,'0')
      }/${d.getFullYear()
      } ${d.getHours()
      }:${d.getMinutes()
      }:${String(d.getSeconds()).padStart(2,'0')}`
  }

  return ''
}

module.exports = {
  getStringDate
}