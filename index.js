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
function problemCount(){
    var totalProblems = $('#problem-container').find('div').filter(':last').attr('id');
    totalProblems = parseInt(totalProblems.slice(1,totalProblems.length));

    console.log(totalProblems);
    return totalProblems;
}
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

function calculateSeconds(lis_time_param) {
    var mult=3600;
    var totalSecondsElapsed = 0;
    for(var i=0;i<lis_time_param.length;i+=1){
        totalSecondsElapsed+=parseInt(lis_time_param[i])*mult;
        mult=mult/60;
    }
    return totalSecondsElapsed;
}

function addTestsDynamically(element, ID, initial, header) {
    alert(element.attr('id'));
    var id = element.find('textarea').filter(':last').attr('id');
    id = parseInt(id.slice(5,id.length))+1;
    element.find('a').remove();
    element.append(header + id + ":" + "<br><br><textarea id='"+initial+'i'+id+"' placeholder='Enter Input' rows='2' cols='30'></textarea>&nbsp;&nbsp;&nbsp;<textarea id='" + initial + 'o' + id +"'placeholder='Enter Output' rows='2' cols='30'></textarea>");
    element.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>Add More</a><br>");
    element.find('a').filter(':last').attr('class',ID);
}


$("body").on('click','.addst',function () {
    console.log('fired event by' + $(this).attr('id'));
    var curr = $(this);

    id = curr.parent().parent().attr('id').slice(0,2);
    addTestsDynamically($("#"+id+"sample"),'addst',id+'st', 'Sample Testcase ');
});


$("body").on('click','.addtc',function () {
    var curr = $(this);
    id = curr.parent().parent().attr('id').slice(0,2);
    addTestsDynamically($("#"+id+"test"),'addtc',id+'tc', 'Testcase ');
});


$('#pbtn').click(function () {
    addProblemsDynamically();
    problemCount();
});


$('#contest_form').submit(function (e) {
    e.preventDefault();
    var totalProblems = problemCount();
    var contestName = $('#ctitle').val();
    var contestCode = $('#ccode').val();
    var contestDate = $('#cdate').val();
    var contestStartTime = $('#cstart').val().split(' ')[0];
    var contestEndTime = $('#cend').val().split(' ')[0];
    var duration = (calculateSeconds(contestEndTime.split(':'))-calculateSeconds(contestStartTime.split(':')));
    var problems = []
    for(var i=1;i<=totalProblems;i+=1) {

        var problemName = $('#p'+i+'title').val();
        var problemStatement = $('#p'+i+'statement').val();
        var problemCode = String.fromCharCode(64+i);
        var id = $('#p'+i+'test').find('textarea').filter(':last').attr('id');
        var totalTestCases = parseInt(id.slice(5, id.length));
        id = $('#p'+i+'sample').find('textarea').filter(':last').attr('id');
        var totalSamples = parseInt(id.slice(5, id.length));
        testCasesInputs = [];
        testCasesOutputs = [];
        sampleCasesInputs = [];
        sampleCasesOutputs = [];
        for (var j = 1; j <= totalTestCases; j += 1) {
            console.log($('#p'+i+'tci' + j).val());
            testCasesInputs.push(convertTestCase($('#p'+i+'tci' + j).val()));
            testCasesOutputs.push(convertTestCase($('#p'+i+'tco' + j).val()));
        }
        for (var j = 1; j <= totalSamples; j += 1) {
            sampleCasesInputs.push(convertTestCase($('#p'+i+'sti' + j).val()));
            sampleCasesOutputs.push(convertTestCase($('#p'+i+'sto' + j).val()));
        }
        obj = {
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
        problems.push(obj);

    }

    data = {
        contest_date : contestDate,
        contest_name : contestName,
        contest_code : contestCode,
        contest_start_time : contestStartTime,
        contest_end_time : contestEndTime,
        duration : duration,
        total_problems : totalProblems,
        prob_data : problems
    }
    console.log(data);

    fetch("http://127.0.0.1:8000/api/contests/new/", {
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
