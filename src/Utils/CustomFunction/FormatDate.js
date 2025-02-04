export default function formatDate(string) {
    const date = new Date(string);
    
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('vi-VN', options);
    return `Ngày ${formattedDate}`
}