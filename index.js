
function addProblemsDynamically() {
    var id = $('#problem-container').find('div.prob-btn').filter(':last').attr('id');
    id = parseInt(id.slice(1,id.length))+1;

    console.log(id);

    s = '<button type="button" class="btn btn-info prob-btn" data-toggle="collapse" data-target="#p' + id + '">Problem ' +id+ '</button><br>'+
        '<div class="collapse prob-btn" id="p'+id+'">\n' +
        '            <div class="form-group">\n' +
        '                <fieldset>\n' +
        '                    <legend>Problem Description</legend>\n' +
        '                    Problem Name : <input id="p'+id+'title" type="text" placeholder="Enter Problem Name"> <br><br><br>\n' +
        '                    Problem Statement:<br>  <br>  <textarea id="p'+id+'statement" placeholder="Enter Problem Statement.." rows="10" cols="60"></textarea>\n' +
        '                </fieldset>\n' +
        '            </div>\n' +
        '            <div id="p' + id +'sample" class="form-group">\n' +
        '                <fieldset>\n' +
        '                    <legend>Sample Testcases</legend>\n' +
        '                    Sample Testcase 1: <br><br><textarea id="p'+id+'sti1" placeholder="Enter Input" rows="2" cols="30"></textarea>\n' +
        '                    &nbsp;&nbsp;&nbsp;<textarea placeholder="Enter Output" id="p'+id+'sto1" rows="2" cols="30"></textarea>\n' +
        '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a class="addst" href="#">Add More</a><br>\n' +
        '                </fieldset>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="form-group" id="p'+id+'test">\n' +
        '                <fieldset>\n' +
        '                    <legend>Test Cases</legend>\n' +
        '                    Testcase 1: <br><br> <textarea placeholder="Enter Input" id="p'+id+'tci1" rows="2" cols="30"></textarea>\n' +
        '                    &nbsp;&nbsp;&nbsp;<textarea placeholder="Enter Output" id="p'+id+'tco1" rows="2" cols="30"></textarea>\n' +
        '                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="addtc" href="#">Add More</a><br>\n' +
        '                </fieldset>\n' +
        '            </div>' +
        '</div>'

    $('#problem-container').append(s);


}

$("#tcb").click(function () {
    console.log('testing');
    addProblemsDynamically()
});

$('#pbtn').click(function () {
    addProblemsDynamically();
});

function convertTestCase(tc_input){
    var modifiedString = '';
    for(var i=0;i<tc_input.length;i+=1){
        if(tc_input[i]=="\n") {
            modifiedString+='\n';
            console.log('newLine found');
        }
        else {
            modifiedString+=tc_input[i];
        }
    }
    console.log('modified string :  ' + modifiedString);
    return modifiedString;
}


function addTestsDynamically(element, ID, initial, header) {
    alert(element.attr('id'));
    var id = element.find('textarea').filter(':last').attr('id');
    id = parseInt(id.slice(5,id.length))+1;
    element.find('a').remove();
    element.append(header + id + ":" + "<br><br><textarea placeholder='Enter Input' rows='2' cols='30'></textarea>&nbsp;&nbsp;&nbsp;<textarea placeholder='Enter Output' rows='2' cols='30'></textarea>");
    element.find('textarea').filter(':nth-last-child(2)').attr('id',initial + 'i' + id);
    element.find('textarea').filter(':last').attr('id',initial + 'o'+ id);
    element.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>Add More</a><br>");
    element.find('a').filter(':last').attr('class',ID);
}

$("body").on('click','.addst',function () {
    console.log('fired event by' + $(this).attr('id'));
    var curr = $(this);

    id = curr.parent().parent().attr('id').slice(0,2);
    addTestsDynamically($("#"+id+"sample"),'addst',id+'st', 'Sample Testcase');
});

$("body").on('click','.addtc',function () {
    var curr = $(this);
    id = curr.parent().parent().attr('id').slice(0,2);
    addTestsDynamically($("#"+id+"test"),'addtc',id+'tc', 'Testcase');
});

$('#contest_form').submit(function (e) {
    e.preventDefault();
    var contestName = $('#ctitle').val();
    var problemName = $('#ptitle').val();
    var problemStatement = $('#pstatement').val();
    var problemCode = 'A';
    var id = $('#tests').find('textarea').filter(':last').attr('id');
    var totalTestCases=parseInt(id.slice(3,id.length));
    id = $('#sampleCases').find('textarea').filter(':last').attr('id');
    var totalSamples=parseInt(id.slice(3,id.length));
    testCasesInputs = [];
    testCasesOutputs = [];
    sampleCasesInputs = [];
    sampleCasesOutputs = [];
    for(var i=1;i<=totalTestCases;i+=1){
        testCasesInputs.push(convertTestCase($('#tci'+ i).val()));
        testCasesOutputs.push(convertTestCase($('#tco'+ i).val()));
    }
    for(var i=1;i<=totalSamples;i+=1){
        sampleCasesInputs.push(convertTestCase($('#sti'+ i).val()));
        sampleCasesOutputs.push(convertTestCase($('#sto'+ i).val()));
    }
    console.log(testCases);
    data = {
        contest_name : contestName,
        problem_name : problemName,
        problem_code : problemCode,
        problem_statement : problemStatement,
        total_tc : totalTestCases,
        total_st : totalSamples,
        test_cases_inputs : testCasesInputs,
        test_cases_outputs : testCasesOutputs,
        sample_test_cases_inputs : sampleCasesInputs,
        sample_test_cases_outputs : sampleCasesOutputs
    }
    console.log(data);

    fetch("http://127.0.0.1:8000/api/contest/new/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
    });