# BBDownAutoExtension (此程式並不能單獨使用, 需配合 [BBDown](https://github.com/RyanL-29/BBDown/tree/master) 放在同一個資料夾內一併使用)


# Config.json 設置

```
{
 "dir": "C:/Users/Ryan/Desktop/test", #影片存放位置
 "prefix": "[Test]", #檔名前綴
 "suffix": "[Test][Test]", #檔名後綴
 "UserAgent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36", #User Agent (如非必要請不要修改)
 "debug": false, #BBDownAutoExtension 除錯選項
 "interval": 1, #更新檢查間距, 單位為分鐘 (最少為1, 少於1會設定為1)
 "tv": false, #使用TV端解析模式
 "app" : false, #使用APP端解析模式
 "intl" : false, #使用國際版解析模式
 "use_mp4box" : false, #使用MP4Box來混流
 "only_hevc" : false, #只下載hevc編碼
 "only_avc" : false, #只下載avc編碼
 "only_info": false, #僅解析而不進行下載
 "hide_streams": false, #不要顯示所有可用音視頻流
 "interactive": false, #交互式選擇清晰度
 "show_all": false, #展示所有分P標題
 "use_aria2c": false, #調用aria2c進行下載(你需要自行準備好二進制可執行文件)
 "multi_thread": true, #使用多線程下載
 "range" : "LATEST", #選擇指定分p或分p範圍：(-p 8 或 -p 1,2 或 -p 3-5 或 -p ALL 或 -p LATEST)
 "audio_only": false, #僅下載音頻
 "video_only" : false, #僅下載視頻
 "sub_only" : false, #僅下載字幕
 "zerofill" : false, #不給分P序號補零
 "debug_bbdown": false, #輸出調試日誌
 "skip_mux": false, #跳過混流步驟
 "language": false, #設置混流的音頻語言(代碼)，如chi, jpn等, 設置為false為不設定
 "access_token": false #設置access_token用以下載TV/APP接口的會員內容, 設置為false為不設定
}
```
# cookie.txt
```
SESSDATA=xxxxxx%xxxxxxxxx%xxxxxxx%xxxx
#BBDown.exe login 命令行取得的cookie

```
# list.txt (一行一個影片網址, 如果哪一行 #號在最前面後面哪一行的內容將不會讀取)
```
#小林家的龍女僕S（僅限港澳台地區）
https://www.bilibili.com/bangumi/play/ep408841
```

使用流程

 Step1: 請下載 [BBDownCore](https://github.com/RyanL-29/BBDown/releases)
 Step2: 請下載 [BBDownEX](https://github.com/RyanL-29/BBDownAutoExtension/releases)
 Step3: 下載下來後把所有東西放在同一個資料夾
 Step4: 你資料夾內的東西應該和以下圖片一樣
![image](https://user-images.githubusercontent.com/48479346/126116001-b11e190f-5eb2-4bdf-8df4-1a40d97bb3b7.png)

 Step5: 設置config.json
 Step6: 使用take_cookie.bat, 取得SESSDATA, 取得的內容將會自動寫到cookie.txt
 Step7: 設定list.txt, 把你想下載的影片網址全部放進去, 請依照上面的教學設置
 Step8: 按BBDownAutoCore.exe, 啟動自動程式
