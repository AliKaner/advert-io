export const formatDate = (date: Date) => {
    const inputDate = new Date(date);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const isImage = (str: string) => {
    try {
        const imagePattern = /.(jpeg|jpg|png|gif|bmp|tiff)/i;
        return imagePattern.test(str);
    } catch (_) {
        return false;
    }
};
