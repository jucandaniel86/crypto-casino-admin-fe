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

  function flatten(destArray: any[], nodeList: any[]) {
    nodeList.forEach((node) => {
      destArray.push(node);
      flatten(destArray, node.descendants || []);
    });
  }

  return {
    removeDuplicates,
    findRecursive,
    flatten,
  };
};
