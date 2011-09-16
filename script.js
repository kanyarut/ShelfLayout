var winSize = [$(window).width(),$(window).height()];
var countentCount = 0;
var currentContent = null;
var currentEntry = [];

$(document).ready(function(){
    $('.content').each(function(){
        var newpos = Math.abs(((winSize[0]-$(this).width())/2)+(winSize[0]*countentCount));
        $(this).css('left',newpos);
        
        var entry = $('.entry',$(this).children('.entries'));
        currentEntry[countentCount] = 1;
        switchEntry(entry);
        
        if(entry.length > 1){
            $(this).append('<input type="range" class="entryslide" min="1" max="'+entry.length+'" value="1" />');
        }
        $('.entryslide',$(this)).change(function(){
            var target = $('.entry:eq('+($(this).val()-1)+')',$(this).parent().children('.entries'));
            target.prevAll().fadeOut('fast');
            switchEntry( target.nextAll().andSelf() );
        });
        countentCount++;
    });

    $('.content').mousewheel(function(event, delta, deltaX, deltaY) {
        if($(this).children('.entries').children('.entry').length > 1){
            if(Math.abs(deltaY) >= 0.25){
                if( delta > 0 ){
                    var newv =  Number($(this).children('.entryslide').val()) +1;
                }else{
                    var newv = Number($(this).children('.entryslide').val())-1;
                }
                $(this).children('.entryslide').val(newv);
                $(this).children('.entryslide').trigger('change');
            }
        }
    });
    
    $('.entry').click(function(){
        $(this).parent().parent().children('.entryslide').val(($(this).index()+1));
        
        $(this).prevAll().fadeOut('fast');
        switchEntry( $(this).nextAll().andSelf() );
    });
    
    $('#screen').width(countentCount*winSize[0]);
    
    currentContent = 1;
    contentNav();
    
    $('#nextcontent').click(function(){
        if(currentContent < countentCount){
            $('#screen').animate({'left': '-='+(winSize[0])});
            currentContent++;
            contentNav();
        }
    });
    
    $('#prevcontent').click(function(){
        if(currentContent > 1){
            $('#screen').animate({'left': '+='+(winSize[0])});
            currentContent--;
            contentNav();
        }
    });
    
    $('body').keydown(function (e) {
        var hit = false;
		var keyCode = e.keyCode || e.which;
		arrow = {left: 37, right: 39, up: 38, down: 40};
		switch (keyCode) {
			case arrow.left:
				$('#prevcontent').trigger('click');
				hit = true;
			break;
			case arrow.right:
				$('#nextcontent').trigger('click');
				hit = true;
			break;
			case arrow.up:
                var newv =  Number($('.content:eq('+(currentContent-1)+')').children('.entryslide').val()) +1;
                $('.content:eq('+(currentContent-1)+')').children('.entryslide').val(newv);
                $('.content:eq('+(currentContent-1)+')').children('.entryslide').trigger('change');
                hit = true;
			break;
			case arrow.down:
				var newv =  Number($('.content:eq('+(currentContent-1)+')').children('.entryslide').val()) -1;
                $('.content:eq('+(currentContent-1)+')').children('.entryslide').val(newv);
                $('.content:eq('+(currentContent-1)+')').children('.entryslide').trigger('change');
                hit = true;
			break;
		}
		if(hit){
            e.preventDefault();
            return false;
		}
	});
});

function switchEntry(entry){
    entry.each(function(index){
        if(index >= 6){
            $(this).fadeOut('fast');
            return false;
        }
        var entryHeight = ($(this).height()/2);
        $(this).css({'-webkit-transform': 'scale('+(10 - index)/10+')', 'z-index':(10 - index), 'margin-top': '-'+((index*50)+(entryHeight+30))+'px'});
        $(this).fadeIn();
    });
}

function contentNav(){
    if(currentContent >= countentCount){
        $('#nextcontent').attr('disabled','disabled');
    }else{
        $('#nextcontent').removeAttr('disabled');
    }
    if(currentContent <= 1){
        $('#prevcontent').attr('disabled','disabled');
    }else{
        $('#prevcontent').removeAttr('disabled');
    }
}