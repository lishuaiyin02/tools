const cloud = require('wx-server-sdk');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const child_process = require('child_process');

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
    console.log("fileURL is", fileURL);

    // 手动编码 URL 路径部分中的汉字
    // 找到路径部分，并进行编码
    const prefix = fileURL.substring(0, fileURL.indexOf('/uploads/'));
    console.log("prefix is",prefix)
    const filepath = fileURL.substring(fileURL.indexOf('/uploads/'));
    console.log("filepath is",filepath)
    const encodedPath = filepath.split('/').map(part => encodeURIComponent(part)).join('/');
    console.log("encodedPath is",encodedPath)
    const encodedFileURL = `${prefix}${encodedPath}`;

    console.log("encodedFileURL is", encodedFileURL);
    // 下载文件
    const response = await axios.get(encodedFileURL, {
      responseType: 'arraybuffer'
    });

    const fileContent = response.data;
    const tempFilePath = path.join('/tmp', 'original.pdf');
    fs.writeFileSync(tempFilePath, fileContent);

    let compressedFilePath;
    let compressedFileName;

    if (action === 'compressPDF') {
      compressedFileName = `compressed-${Date.now()}.pdf`;
      compressedFilePath = path.join('/tmp', compressedFileName);

      // 使用 Ghostscript 压缩 PDF
      await new Promise((resolve, reject) => {
        child_process.exec(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${compressedFilePath} ${tempFilePath}`, (error, stdout, stderr) => {
          if (error) {
            reject(stderr);
          } else {
            resolve(stdout);
          }
        });
      });
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
    fs.unlinkSync(tempFilePath);
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
