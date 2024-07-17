Page({
  data: {
    imageFileName: '',
    imageFilePath: '',
    compressedImageFilePath: '',

    pdfFileName: '',
    pdfFilePath: '',
    compressedPdfFilePath: ''
  },

  chooseImage() {
    wx.chooseMessageFile({
      count: 1,
      type: 'image',
      success: res => {
        const tempFile = res.tempFiles[0];
        console.log("choose lujing is",res.tempFiles[0])
        this.setData({
          imageFileName:tempFile.name,
          imageFilePath: tempFile.path,
          compressedImageFilePath: ''
        });
      }
    });
  },

  compressImage() {
    const { imageFilePath } = this.data;
    if (!imageFilePath) {
      wx.showToast({
        title: '请先选择照片',
        icon: 'none'
      });
      return;
    }

    wx.compressImage({
      src: imageFilePath,
      quality: 60,
      success: res => {
        this.setData({
          compressedImageFilePath: res.tempFilePath
        });
        wx.showToast({
          title: '压缩成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('压缩照片失败', err);
        wx.showToast({
          title: '压缩失败',
          icon: 'none'
        });
      }
    });
  },

  downloadImage() {
    const { compressedImageFilePath } = this.data;

    wx.saveImageToPhotosAlbum({
      filePath: compressedImageFilePath,
      success: res => {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
      },
      fail: err => {
        console.error('保存照片失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    });
  },

  choosePDF() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf'],
      success: res => {
        const tempfile = res.tempFiles[0];
        this.setData({
          pdfFileName: tempfile.name,
          pdfFilePath: tempfile.path,
          compressedPdfFilePath: ''
        });
      }
    });
  },

  compressPDF() {
    const { pdfFilePath, pdfFileName } = this.data;
    if (!pdfFilePath) {
      wx.showToast({
        title: '请先选择PDF文件',
        icon: 'none'
      });
      return;
    }

    // 上传文件到云存储
    const encodedFileName = encodeURIComponent(pdfFileName);
    wx.cloud.uploadFile({
      cloudPath: `uploads/${Date.now()}-${pdfFileName}`,
      filePath: pdfFilePath,
      success: res => {
        // 调用云函数处理文件
        console.log("pdf fileid is",res)
        wx.cloud.callFunction({
          name: 'fileHandler',
          data: {
            fileID: res.fileID,
            action: 'compressPDF'
          },
          success: res => {
            if (res.result.error) {
              console.error('PDF 压缩失败:', res);
              wx.showToast({
                title: 'PDF 压缩失败',
                icon: 'none'
              });
            } else {
              console.log('PDF 压缩成功:', res.result);
              this.setData({ compressedPdfFilePath: res.result.fileID });
            }
          },
          fail: err => {
            console.error('调用云函数失败:', err);
            wx.showToast({
              title: '调用云函数失败',
              icon: 'none'
            });
          }
        });
      },
      fail: err => {
        console.error('文件上传失败:', err);
        wx.showToast({
          title: '文件上传失败',
          icon: 'none'
        });
      }
    });
  },

  downloadPDF() {
    const { compressedPdfFilePath } = this.data;
    wx.cloud.downloadFile({
      fileID: compressedPdfFilePath,
      success: res => {
        console.log("res is",res);
        const filePath =`${wx.env.USER_DATA_PATH}/${this.data.pdfFileName}`
        wx.getFileSystemManager().saveFile({
          tempFilePath: res.tempFilePath,
          filePath: filePath,
          success: function (res_) {
            console.log(res_);
            console.log("filePath is",filePath);
            wx.openDocument({
              filePath: res_.savedFilePath,
              showMenu:true,
            })
          },
          fail: function (err) {
            console.log(err);
          }
        })
      },
      fail: err => {
        console.error('下载PDF失败', err);
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    });
  },

   // 配置分享功能
   onShareAppMessage() {
    return {
      title: '小将压缩',
      path: '/pages/tools/tools', // 分享路径
      imageUrl: '/images/tools.jpg' // 自定义分享图片
    };
  },

  onShareTimeline() {
    return {
      title: '小将压缩',
      query: 'page=tools', // 分享页面的查询参数
      imageUrl: '/images/tools.jpg' // 自定义分享图片
    };
  }
});
