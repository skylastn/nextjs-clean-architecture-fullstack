export function ConvertResponse<T>() {
  return {
    fromJson(json: string): T {
      return JSON.parse(json) as T;
    },
    toJson(value: T): string {
      return JSON.stringify(value);
    },
  };
}
