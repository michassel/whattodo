$(document).ready( function(){
    
    $('#btn-ask').click(function() {
        
        var question = $('#input-question').val();
        
        if(question==='') {
            $("#div-input").addClass("has-error");
            return false;
        }
        $("#div-input").removeClass("has-error");
        
        $.ajax({
            type: "POST",
            url: "htpp://abrakadabra.devs-itechnologie.dyndns.biz/game/api/pytaj.php",
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
            }
        });
    });
    
});   
 
$( ".close" ).click(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        //$(this).remove(); 
    });
});