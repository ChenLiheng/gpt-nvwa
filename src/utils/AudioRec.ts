/*
 * @Author: 陈立恒  chenliheng@youlai.cn
 * @Date: 2022-11-09 15:12:11
 * @LastEditors: 陈立恒  chenliheng@youlai.cn
 * @LastEditTime: 2022-11-09 17:29:10
 * @Description:
 */

const isAndroidOrIOS = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isAndroid) {
    return "android";
  }
  if (isiOS) {
    return "iOS";
  }
  return "PC";
};

// @ts-ignore
const isEdge = () =>
  navigator.userAgent.indexOf("Edge") !== -1 &&
  (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);

class AudioRec {
  private microphone: MediaStream | null = null;
  private recorder;
  /**
   * 捕获麦克风
   * @returns
   */
  async captureMicrophone() {
    return new Promise((resolve, reject) => {
      if (this.microphone) {
        resolve(this.microphone);
      }
      console.log("当前环境", isAndroidOrIOS);
      // 判断是否支持
      console.log(navigator.mediaDevices, navigator.mediaDevices.getUserMedia);
      if (
        typeof navigator.mediaDevices === "undefined" ||
        !navigator.mediaDevices.getUserMedia
      ) {
        reject("该浏览器不支持语音录入，请使用谷歌、火狐等其他主流浏览器。");
      }
      try {
        navigator.mediaDevices
          .getUserMedia({
            audio: isEdge() ? true : { echoCancellation: false },
          })
          .then((mic) => {
            this.microphone = mic;
            resolve(mic);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async startRec() {
    try {
      await this.captureMicrophone();
      const options = {
        type: "audio",
        numberOfAudioChannels: 1,
        checkForInactiveTracks: false,
        bufferSize: 4096,
        recorderType: window.StereoAudioRecorder,
      };

      if (this.recorder) {
        this.recorder.destroy();
        this.recorder = null;
      }
      // recordre 实例
      this.recorder = window.RecordRTC(this.microphone, options);
      console.log(this.recorder);

      this.recorder.startRecording();
    } catch (error) {
      console.log("startRec catch", error);
    }
  }

  stopRec() {
    this.recorder.stopRecording(() => {
      const internalRecorder = this.recorder.getInternalRecorder();
      console.log("停止录音回调internalRecorder", internalRecorder);
      // 左声道
      const leftchannel = internalRecorder.leftchannel;
      // 右声道
      const rightchannel = internalRecorder.rightchannel;
      console.log("左声道", leftchannel, rightchannel);
      // console.log((internalRecorder.blob,window.URL||webkitURL).createObjectURL(internalRecorder.blob))
      console.log("internalRecorderBlob", internalRecorder.blob);
      this.downloadRecording();
    });

    // 上传文件
    /* const form = new FormData()
    form.append("upfile",internalRecorder.blob,"recorder.wav");
    console.log("form",form)
    $.ajax({
      url: '后端接口地址',
      type:'POST',
      cache: false,
      processData: false,
      contentType: false,
      data: form,
      success: function(data){
        console.log("后端返回数据对象",data)
      // 根据数据进行具体操作
        
    
      },
      error:function (err) { 
        console.log("ajaxerr",err)
        }
    }) */
  }

  downloadRecording() {
    console.log("下载", this.recorder.blob);

    if (!this.recorder || !this.recorder.getInternalRecorder().blob) return;
    const blob = this.recorder.getInternalRecorder().blob;
    const file = new File([blob], `${Date.now()}.wav`, {
      type: "audio/wav",
    });
    console.log("下载录音", blob);
    window.invokeSaveAsDialog(file);
  }
}

export default AudioRec;
