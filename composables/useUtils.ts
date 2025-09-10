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
    return arr.filter(function f(o) {
      return (
        o[key].includes(search) ||
        (o.children && (o.children = o.children.filter(f)).length)
      );
    });
  }

  return {
    removeDuplicates,
    findRecursive,
  };
};
