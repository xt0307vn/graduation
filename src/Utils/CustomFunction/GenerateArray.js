const generateArray = (start, end) => {
    const length = end - start + 1
    return Array.from({length: length}, (_, index) => index + start);
}

export default generateArray