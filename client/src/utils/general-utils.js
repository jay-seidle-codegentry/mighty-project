export const swapArrayElements = (arr, fromIndex, toIndex) => {
    if(fromIndex === toIndex) return arr;
    if(fromIndex < 0 || fromIndex >= arr.length) return arr;
    if(toIndex < 0 || toIndex >= arr.length) return arr;

    const fromObj = arr[fromIndex];
    const toObj = arr[toIndex];

    arr[fromIndex] = toObj;
    arr[toIndex] = fromObj;

    return arr;
};