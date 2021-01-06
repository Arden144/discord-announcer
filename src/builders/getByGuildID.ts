export function getByGuildID<T>(obj: { [key: string]: T }, factory: () => T) {
  return function (id: string): T {
    if (!Object.prototype.hasOwnProperty.call(obj, id)) {
      obj[id] = factory();
    }
    return obj[id];
  };
}
