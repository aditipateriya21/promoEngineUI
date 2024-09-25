
export const convertValue = (value) => {
    if (value === '') return value;
    const number = Number(value);
    return isNaN(number) ? value : number;
};
