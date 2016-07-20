//put your main code here
function doGet() {
  return ContentService.createTextOutput('Hello, world!');
}

global.doGet = doGet;
