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

/**
 * The Value must not be {null, undefined} nor empty.
 * Supported types are: string, array, map
 * @param val value to be evaluated
 */
export const notEmpty = (
  val: undefined | null | string | Array<any> | Map<any, any>
): boolean => {
  if (val === undefined || val === null) {
    return false;
  }

  if (typeof val === "string") {
    return val.trim().length > 0;
  } else if (Array.isArray(val)) {
    return val.length > 0;
  } else if (val instanceof Map) {
    return val.size > 0;
  }

  throw new Error("Unsupported type");
};

/**
 * The value size must be between the specified boundaries (included).
 * Supported types are: string, array, map
 * {null} elements are considered valid.
 * @param val value to be evaluated
 */
export const size = (
  val: undefined | null | string | Array<any> | Map<any, any>,
  min: number,
  max: number = Number.MAX_VALUE
): boolean => {
  if (val === undefined || val === null) {
    return true;
  }

  if (typeof val === "string") {
    return val.trim().length >= min && val.trim.length <= max;
  } else if (Array.isArray(val)) {
    return val.length >= min && val.length <= max;
  } else if (val instanceof Map) {
    return val.size >= min && val.size <= max;
  }

  throw new Error("Unsupported type");
};

/**
 * The value must match the specified regular expression.
 * {null} elements are considered valid.
 * @param val value to be evaluated
 */
export const pattern = (val: undefined | null | string, regExp: RegExp) => {
  if (val === undefined || val === null) {
    return true;
  }
  return regExp.test(val);
};
