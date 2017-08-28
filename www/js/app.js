$(document).ready( function(){
    
    $('#btn-ask').click(function() {
        
        var question = $('#input-question').val();
        
        if(question==='') {
            $("#div-input").addClass("has-error");
            return false;
        }
        $("#div-input").removeClass("has-error");

        $(".alert").slideDown(300).fadeTo(500, 1);
        
        $.ajax({
            type: "POST",
            url: "http://abrakadabra.devs-itechnologie.dyndns.biz/game/api/pytaj.php",
            dataType:'json',
            data: {question: (question)},
            success: function(data) {
                if (data.status == "error") {
                    console.log(data);
                    $("#msg").html(data.msg);
                    $("#second_msg").html(data.status);
                    $(".alert").fadeTo(0, 500).slideUp(500);
                }
                if (data.status == "ok") {
                    $("#msg").html(data.msg);
                    $("#second_msg").html(data.second_msg);
                    $(".alert").slideDown(300).fadeTo(500, 1);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(".alert").slideDown(300).fadeTo(500, 1);
                $("#msg").html(textStatus + jqXHR.responseText);
            }
        });
    });

    $.ajax({
        type: "POST",
        url: "http://abrakadabra.devs-itechnologie.dyndns.biz/game/api/ostatnie_pytania_czas.php",
        dataType:'json',
        success: function(data) {
            //console.log(data);
            var array_length = data.length;
            
            for(var i=0;i<array_length;i++) {
                $("#last_questions").append('<li class="list-group-item"><span class="badge">' + data[i].id + '</span>' + data[i].pytanie + '</li>'); 
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + jqXHR.responseText);
        }
    });
    
    $.ajax({
        type: "POST",
        url: "http://abrakadabra.devs-itechnologie.dyndns.biz/game/api/ostatnie_pytania.php",
        dataType:'json',
        success: function(data) {
            console.log(data);
            var array_length = data.length;
            
            for(var i=0;i<array_length;i++) {
                $("#popular_questions").append('<li class="list-group-item"><span class="badge">' + data[i].id + '</span>' + data[i].pytanie + '</li>'); 
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + jqXHR.responseText);
        }
    });
    
});   
 
$( ".close" ).click(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        //$(this).remove(); 
    });
});

$(".list-group-item").click(function() {
    var question = $(this).val();
    console.log(question);
});