/** @OnlyCurrentDoc */


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('My Custom Menu')
    .addItem('AeronDrakes TOC','AeronDrakesTOC')
    .addToUi();
}

function AeronDrakesTOC() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AeronDrakes TOC");
  numRows = getLastDataRow(ss,"A");
    for (r=1; r<=numRows; r++) {
      var str = ss.getRange(r,1).getDisplayValue();
      var lng = str.length;
      var newlng = str.replace(/\./g,"").length;
      listLvl = lng - newlng + 1;
      var regExp = /\(#p(\d+)\)/;
      var matches = regExp.exec(str);
      var start = str.indexOf("[",0);
      var cut = str.indexOf(" ",start);
      str = str.slice(0,start + 1) + "<span>" + matches[1] + "</span><span>" + str.slice(cut + 1);
      var start = str.indexOf("]",cut);
      str = str.slice(0,start) + "</span>" + str.slice(start);
      for (x=2; x<=listLvl; x++) {
        str = "  " + str
      }
      ss.getRange(r,2).setValue(str);
      

      //matches[1] contains the value between the parentheses
      console.log(numRows)
      console.log(listLvl)
      console.log(str)
    }
};



function getLastDataRow(sheet,chosenColumn) {
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(chosenColumn + lastRow);
  if (range.getValue() !== "") {
    return lastRow;
  } else {
    return range.getNextDataCell(SpreadsheetApp.Direction.UP).getRow();
  }
    
}
