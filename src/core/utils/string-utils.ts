export const generateSlug = (text: string): string => {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu ra khỏi ký tự
    .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu thanh (sắc, huyền, hỏi...)
    .replace(/[đĐ]/g, 'd') // Xử lý chữ đ/Đ của tiếng Việt
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/[^\w\-]+/g, '') // Xóa các ký tự đặc biệt không phải chữ/số/-
    .replace(/\-\-+/g, '-') // Xóa các dấu gạch ngang kép (--)
    .replace(/^-+/, '') // Cắt gạch ngang ở đầu
    .replace(/-+$/, ''); // Cắt gạch ngang ở cuối
};