export const validURL = (str: string | undefined) => {
  if (!str) {
    return false;
  }

  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const validRUC = (str: string | undefined): boolean => {
  if (!str) {
    return false;
  }

  const pattern = /^\d+$/;
  return str.trim().length === 11 && pattern.test(str.trim());
};

export const validUbigeo = (str: string | undefined): boolean => {
  if (!str) {
    return false;
  }

  const pattern = /^\d+$/;
  return str.trim().length === 6 && pattern.test(str.trim());
};

export const validEmail = (str: string | undefined): boolean => {
  if (!str) {
    return false;
  }

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(str).toLowerCase());
};

export const validString = (str: string | undefined): boolean => {
  if (!str) {
    return false;
  }

  return str.trim().length > 0;
};
