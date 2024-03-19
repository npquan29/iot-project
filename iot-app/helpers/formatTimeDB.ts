export const formatTimeFromISOString = (isoString: string) => {
    // Tạo một đối tượng Date từ chuỗi ISO
    const date = new Date(isoString);

    // Lấy giờ, phút, giây và đảm bảo rằng chúng luôn có 2 chữ số
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Kết hợp lại để có định dạng hh:mm:ss
    return `${hours}:${minutes}:${seconds}`;
}

export const formatISODate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}