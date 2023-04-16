export function formatDate(date) {
    if (date) return new Date(date)?.toDateString()?.slice(4,)
    else return ''
}

export function getQuater(date) {
    let quater = '';

    if (date) {
        const getMonth = new Date(date)?.getUTCMonth();
        
        if (getMonth <= 2) quater = 'Q1'
        else if (getMonth > 2 && getMonth <= 5) quater = 'Q2'
        else if (getMonth > 5 && getMonth <= 8) quater = 'Q3'
        else if (getMonth > 8 && getMonth <= 11) quater = 'Q4'
        else quater = ''
    }

    return quater;
}

export const base64BinaryBuffer = (file, output, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
  
    switch (output) {
      case 'base64':
        reader.readAsDataURL(file)
        break
      case 'binary':
        reader.readAsBinaryString(file)
        break
      case 'buffer':
        reader.readAsArrayBuffer(file)
        break
  
      default:
        reader.readAsBinaryString(file)
        break
    }
  }