export const getValidated = (
  valid: boolean,
  value: any
): "default" | "success" | "error" => {
  if (valid) {
    return "success";
  }
  if (value !== undefined) {
    return "error";
  }
  return "default";
};
