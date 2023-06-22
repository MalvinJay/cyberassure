import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

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

export const present = (value) => {
  if (!value) {
    return false
  }
  if (typeof value === 'object') {
    if (Object.keys(value).length > 0) {
      return true
    }
    return false
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return value && value.length > 0
  } 
    return !!value
}

export const createQueryParams = (filters={}) => {
  let query = '';

  if (present(filters)) {
    Object.keys(filters).forEach((key, index) => {
      if (typeof filters[key] === 'undefined') {
        query = '';
      } else if (typeof filters[key] === 'object') {
        filters[key].forEach(el => {
          query += `${index != 0 ? '&':'?'}${key}[]=${el}`
        });
      } else {
        query += `${index != 0 ? '&':'?'}${key}=${filters[key]}`
      }
    })
  }

  return query;
}

export const encryptId = (str, encryptionKey) => {
  const ciphertext = AES.encrypt(str, encryptionKey);
  return encodeURIComponent(ciphertext.toString());
}

export const decryptId = (str, encryptionKey) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, encryptionKey).toString(enc.Utf8);
}