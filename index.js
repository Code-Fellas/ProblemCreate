$("#tcb").click(function () {
    console.log('testing');
    var tc_input = $("#stc1").val();
    var count=0;
    var modifiedString = ''
    for(var i=0;i<tc_input.length;i+=1){
        if(tc_input[i]=="\n") {
            count += 1;
            modifiedString+='\\n';
            console.log('newLine found');
        }
        else {
            modifiedString+=tc_input[i];
        }
    }
    console.log('modified string :  ' + modifiedString);

});

function addDynamically(element, ID, initial, header) {
    var id = element.find('textarea').filter(':last').attr('id');
    id = parseInt(id.slice(3,id.length))+1;
    $(this).remove();
    element.append(header + id + ":" + "<br><br><textarea rows='2' cols='30'> </textarea>&nbsp;&nbsp;&nbsp;<textarea rows='2' cols='30'> </textarea>");
    element.find('textarea').filter(':nth-last-child(2)').attr('id',initial + 'i' + id);
    element.find('textarea').filter(':last').attr('id',initial + 'o'+ id);
    element.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>Add More</a><br>");
    element.find('a').filter(':last').attr('id',ID);
}

$("#sampleCases").on('click','#addsc',function () {
    addDynamically($("#sampleCases"),'addsc','st', 'Sample Testcase');
});

$("#tests").on('click','#addtc',function () {
    addDynamically($("#tests"),'addtc','tc', 'Testcase');
});

