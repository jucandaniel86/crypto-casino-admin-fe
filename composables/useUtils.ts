export const useUtils = () => {
  const removeDuplicates = (arr: any[], searchedKey: string) => {
    return arr.reduce((unique, o) => {
      if (!unique.some((obj: any) => obj[searchedKey] === o[searchedKey])) {
        unique.push(o);
      }
      return unique;
    }, []);
  };

  function findRecursive(search: string, key: string, arr: any[]) {
    return arr.reduce((a, item) => {
      if (a) return a;
      if (item[key] === search) return item;
      if (item.children) return findRecursive(search, key, item.children);
    }, null);
  }

  return {
    removeDuplicates,
    findRecursive,
  };
};
