$(document).ready(function(){
    
    var resolution = {x: 300, y: 300};
    var scale = 0.5; // resolution width / css width
    
    var mouseDown = false;
    var pencil = {color: "#000", size: 5};
    var marker = {color: "#000", size: 15};
    var eraser = {color: "#fff", size: 25};
    var previous;
    var canvas = $("#mainCanvas");
    var context = canvas[0].getContext("2d");
    context.scale(scale, scale);
    eraseall();
    
    function eraseall(){
        context.clearRect(0, 0, resolution.x / scale, resolution.y / scale);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, resolution.x / scale, resolution.y / scale);
    }
    
    $("#done").click(function(){
        var data = canvas.get(0).toDataURL();
        console.log(data);
        window.open(data);
    });
    
    canvas.mousedown(function(e){
        mouseDown = true;
        previous = {x: e.offsetX , y: e.offsetY};
    }).mousemove(function(e){
        if(mouseDown){
            var currentTool;
            if($("input[name=tool]:checked", "#tool").val() == "pencil")
                currentTool = pencil;
            if($("input[name=tool]:checked", "#tool").val() == "marker")
                currentTool = marker;
            if($("input[name=tool]:checked", "#tool").val() == "eraser")
                currentTool = eraser;
            var current = {x: e.offsetX, y: e.offsetY};
            context.strokeStyle = currentTool.color;
            console.log(currentTool.thecolor);
            context.lineCap = "round";
            context.lineWidth = currentTool.size;
            context.beginPath();
            context.moveTo(current.x, current.y);
            context.lineTo(previous.x, previous.y);
            context.stroke();
            previous = current;
        }
    }).mouseup(function(){
        mouseDown = false;
    }).mouseleave(function(){
        canvas.mouseup();
    }).touchstart(function(e){
        canvas.mousedown(e);
    }).touchmove(function(e){
        canvas.mousemove(e);
    }).touchend(function(e){
        canvas.mouseup(e);
    });
    
    /*function getonline(){
        $.ajax({
            url: "./resources/php/online.php",
            async: true,
            method: 'POST',
            data: {
                board_id:info.id
            },
            success: function(result){
                $("#online").html(result);
            }
        });

    }*/

    /*function updatethumb(){
        var data = canvas.get(0).toDataURL();

        $.ajax({
            url: './resources/php/updatethumb.php',
            async: true,
            method: 'POST',
            data: {
                id: info.id,
                data: data
            },
            success: function(response){
                console.log(response);
            }
        });
    }*/
    
    
    /*getonline();
    setInterval(function(){getonline();},5000);
    updatethumb();*/
});