module.exports = {
  files: ["./main/**", ".main/images/*.jpg"], //監視するファイルを指定
  server: {
    //デフォルトで開くファイルを指定
    baseDir: "./main/", //ファイルまでのディレクトリのパス
    index: "index.html", //ファイル名
  },
  proxy: false,
  port: 8000, //使用するポート番号
};
