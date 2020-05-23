export function permutations(arr: any[], size: number): any[][] {
    const  results = [];

    for (let i = 0; i < arr.length; i++) {
        const  res = [arr[i]];

        if (size === 1) {
            results.push(res)
        } else {
            const rest = permutations(arr, size - 1);

            for (let j = 0; j < rest.length; j++) {
                results.push(res.concat(rest[j]))
            }
        }
    }
    return results
}
