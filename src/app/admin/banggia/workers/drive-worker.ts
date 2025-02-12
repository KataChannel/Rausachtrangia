/// <reference lib="webworker" />
import * as XLSX from 'xlsx';

addEventListener('message', ({ data }) => {
  try {
    // Đọc file Excel từ Uint8Array
    // Gửi dữ liệu đã xử lý về component
    postMessage({ status: 'success', data: data });

  } catch (error:any) {
    console.log(error);
    
    postMessage({ status: 'error', message: error.message });
  }
});
