const cloud = require('wx-server-sdk');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = require('url');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { fileID, action } = event;

  try {
    // 获取文件临时链接
    const result = await cloud.getTempFileURL({
      fileList: [fileID]
    });

    let fileURL = result.fileList[0].tempFileURL;
    console.log("fileURL is",fileURL);
    // 手动编码 URL 路径部分
   // 手动编码 URL 路径部分中的汉字
    fileURL = fileURL.replace(/[\u4e00-\u9fa5]/g, char => encodeURIComponent(char));
    console.log("encodedFileURL is", fileURL);
    // 下载文件
    const response = await axios.get(fileURL, {
      responseType: 'arraybuffer'
    });

    const fileContent = response.data;

    let compressedFilePath;
    let compressedFileName;

    if (action === 'compressPDF') {
      // 压缩 PDF
      const pdfDoc = await PDFDocument.load(fileContent);
      const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: false });
      compressedFileName = `compressed-${Date.now()}.pdf`;
      compressedFilePath = path.join('/tmp', compressedFileName);
      fs.writeFileSync(compressedFilePath, compressedPdfBytes);
    } else if (action === 'compressImage') {
      // 压缩图片逻辑可以在此处实现
      // 假设已经处理好并保存到 compressedFilePath 和 compressedFileName
    }

    // 上传压缩后的文件
    const uploadResult = await cloud.uploadFile({
      cloudPath: `compressed/${compressedFileName}`,
      fileContent: fs.readFileSync(compressedFilePath)
    });

    // 删除临时文件
    fs.unlinkSync(compressedFilePath);

    return {
      fileID: uploadResult.fileID
    };
  } catch (error) {
    console.error('文件处理失败', error);
    return {
      error: '文件处理失败'
    };
  }
};
