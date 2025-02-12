/// <reference lib="webworker" />
import * as XLSX from 'xlsx';

addEventListener('message', ({ data }) => {
  try {
    // Đọc file Excel từ Uint8Array
    console.log(data);
    
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
    const worksheet = workbook.Sheets[sheetName];

    // Chuyển đổi sheet thành JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    console.log(jsonData);
    // Gửi dữ liệu đã xử lý về component
    postMessage({ status: 'success', data: jsonData });

  } catch (error:any) {
    console.log(error);
    
    postMessage({ status: 'error', message: error.message });
  }
});
