/// <reference lib="webworker" />
import * as XLSX from 'xlsx';

addEventListener('message', ({ data }) => {
  try {
    // Đọc file Excel từ Uint8Array
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
    const worksheet = workbook.Sheets[sheetName];

    // Chuyển đổi sheet thành JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

    // Gửi dữ liệu đã xử lý về component
    postMessage({ status: 'success', data: jsonData });
  } catch (error:any) {
    postMessage({ status: 'error', message: error.message });
  }
});
