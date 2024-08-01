"use strict";
const $ = jQuery;
let scheduleOperatory = document.getElementById('schedule-operatory');
let scheduleTable = document.getElementById('table-schedule-time');
let timelineTable = document.getElementById('table-timeline');      
let scheduleCont = document.getElementById('schedule-overflow');
let currentView = document.getElementById('current-time');
let eventStore = document.getElementById('event-store');
window.onload = function(){
    loadSchedule();
}



function loadSchedule(){

    //24h loop
    for (let i = 0; i <= 23; i++) {
        let suffix = i < 12 ? 'am' : 'pm' ;
        let time = i ;
        if(i > 12){time = i - 12}
        let data_hours = i;
        $(timelineTable).append(`
            <tr><td class="time"><p class="big-time">${time} <span>${suffix}</span></p><p class="lb-minutes top">15</p><p class="lb-minutes center">30</p><p class="lb-minutes bottom">45</p></td></tr>
                                `);
        $(scheduleTable).append(`
<tr data-date-time="${data_hours}:00">${cellsOperationRender()}</tr>
<tr data-date-time="${data_hours}:15">${cellsOperationRender()}</tr>
<tr data-date-time="${data_hours}:30">${cellsOperationRender()}</tr>
<tr data-date-time="${data_hours}:45">${cellsOperationRender()}</tr>
${data_hours == 23 ? '<tr data-date-time="24:00"></tr>' : ''}`
                                );
       
  
    }
    //nhanvien event store
    $(eventStore).find('tr').append(`${cellsOperationRender(`<div class="events-mirror"></div><div class="events"></div>`)}`);
    $(scheduleCont).parent('td').attr("colspan", scheduleOperatory.rows[0].cells.length);
    
    
    //addCustomer('12:00', '13:00', '13:00', 0, {color: '#fd9c3e', mess: true, isProcess: true, isNew: true, classCus: ['cus-01', 'paid', 'sv-5']});
    //addCustomer('11:00', '12:00', '12:00', 1, {color: '#fd9c3e', mess: true, cCount: 1, isProcess: true, isNew: true, classCus: ['cus-01', 'paid', 'sv-4']});
    
    //addCustomer('17:00', '17:30', '17:30', 0, {color: '#3a87ad', mess: true, cCount: 2, isProcess: true, isNew: true, classCus: ['cus-02', 'paid', 'sv-3']});
    //addCustomer('17:30', '18:00', '18:00', 1, {color: '#3a87ad', mess: true, cCount: 3, isProcess: true, isNew: true, classCus: ['cus-02', 'paid','sv-2']});
    addCustomer('18:00', '18:30', '18:30', 2, {color: '#3a87ad', mess: true, cCount: 4, isProcess: true, extra: 15, classCus: ['cus-02', 'paid' ,'free-axis', 'sv-1']});
    
    //addCustomer('19:15', '19:45', '20:45', 4, {color: '#8FD400', cCount: 1, isProcess: true, isNew: true, classCus: ['cus-03', 'booking', 'sv-1']});
    //addCustomer('20:45', '21:15', '22:15', 5, {color: '#8FD400', cCount: 2, isProcess: true, isNew: true, classCus: ['cus-03','free-axis', 'booking', 'sv-2']});
    addCustomer('22:15', '23:00', '23:00', 6, {color: '#8FD400', cCount: 2, isProcess: true, isNew: true, classCus: ['cus-03', 'booking', 'free-axis', 'sv-3']});
    
    //addCustomer('19:00', '19:30', '19:45', 2, {color: '#FE0883', isNew: true, classCus: ['cus-04', 'booking', 'sv-1']});
    //addCustomer('20:00', '21:00', '21:30', 3, {color: '#FE0883', isNew: true, classCus: ['cus-04','free-axis', 'booking', 'sv-2']});
    addCustomer('22:00', '22:30', '22:30', 4, {color: '#FE0883', isNew: true, classCus: ['cus-04', 'booking', 'free-axis', 'sv-2']});

    
    addCustomer('15:00', '15:30', '15:30', 0, {color: '#C63D2D', classCus: ['cus-05', 'booking', 'sv-1']});
    addCustomer('15:45', '16:45', '16:45', 1, {color: '#C63D2D', classCus: ['cus-05', 'booking', 'sv-2']});
    addCustomer('17:00', '17:30', '17:30', 2, {color: '#C63D2D', classCus: ['cus-05','booking', 'free-axis', 'sv-3']});
    
    addCustomer('18:00', '18:45', '19:45', 10, {color: '#910101', isNew: true, classCus: ['cus-06', 'booking', 'sv-5']});
    addCustomer('19:45', '21:30', '22:30', 11, {color: '#910101', isNew: true, classCus: ['cus-06', 'booking','sv-4']});
    addCustomer('22:30', '23:00', '23:00', 12, {color: '#910101', isNew: true, classCus: ['cus-06','booking', 'free-axis', 'sv-2']});
    
    addBlankTime('18:45', '19:00', 2);
    document.querySelectorAll('.ev-draggable').forEach(function(ele,index){
        draggSch(ele);

    });
    // fixed left col
    $("#schedule-overflow-horizontal").on("scroll", function (e) {
        let horizontal = e.currentTarget.scrollLeft;
        let vertical = e.currentTarget.scrollTop;
        timelineTable.style.left = horizontal +'px';
    });
    checkOvertimeEvent();
    //recall call function
    currentView.style.top = positionYByTime()+'px';
    scheduleCont.scrollTop = currentView.offsetTop - scheduleCont.clientHeight/2;
    var xInterval = setInterval(function() {
        currentView.style.top = positionYByTime()+'px';
        checkOvertimeEvent();
    }, 5000);

}

//Schedule functions
function checkOvertimeEvent(){
    $('.sch-event').each(function(index, ele){
        checkOvertimeSingle(ele);
    });
}
function checkOvertimeSingle(ele){
    let posYt = ele.offsetTop;
    let posYb = $(ele).innerHeight() + ele.offsetTop;

    if(posYt < positionYByTime()){
        $(ele).addClass('overtime');
    } else {
        $(ele).removeClass('overtime');
    }
}
function cellsOperationRender(str=''){
    var result = [];
    for(let i=1 ; i <  scheduleOperatory.rows[0].cells.length; i++){
        let cell = scheduleOperatory.rows[0].cells[i];
        result.push(`<td data-type="${cell.getAttribute('data-type')}" class="${cell.className}">${str}</td>`);
    }
    return result;
}
function OtherEvent(ele){
    var myCl  = $(ele).attr('class').split(' ').filter(myClass =>{
        let mystring = myClass,
            expr = /cus-/;
        return expr.test(mystring);
    });
    var result = [];
    $(`.${myCl[0]}`).each(function(){
        if(ele == this){
           
        } else {
           result.push(this);
        }
    });
    return result;
}
function inColEvent(ele){
    var result = [];
    $(ele).closest('.events').find('.sch-event').each(function(){
        if(ele == this){
           
        } else {
           result.push(this);
        }
    });
    
    
    return result;
};
function positionYByTime(time =  new Date()){
    let divH = scheduleTable.clientHeight;
    let rowH = 160;
    let hour = time.getHours();
    let minute = time.getMinutes() + 1;
    return hour/24*divH + minute/60*rowH;
};
function timeByPositionY(pos){
    let divH = scheduleTable.clientHeight;
    let rawTime = pos/divH*24;
    let ratioM = rawTime - parseInt(rawTime);
    let hours = parseInt(rawTime);
    let minutes = 0;
    if(ratioM > 0){
        minutes = ratioM*60;
    }
    return `${hours}:${minutes == 0 ? '00' : minutes}`;
};
function addCustomer(timeStar = "", timeEnd = "", tierTimeEnd = "" , operatory = 0, opt = {
        color: '#c0c0c0',
        isNew: false,
        isProcess: false,
        mess: false,
        cCount: 0,
        extra: 0,
        classCus: [''],}){
    let contCell = $(eventStore).find('td:not(.time)').eq(operatory + 1);
    let contEle = contCell.children('.events');
    let tier = parseInt(contCell.data('type'));
    
    let hoursS = parseInt(timeStar.split(':')[0]);
    let minutesS = parseInt(timeStar.split(':')[1]);
    let topPosY = $(scheduleTable).find(`tr[data-date-time="${hoursS}:${minutesS == 0 ? '00' : minutesS}"]`)[0].offsetTop;

    let hoursE = parseInt(tierTimeEnd.split(':')[0]);
    let minutesE = parseInt(tierTimeEnd.split(':')[1]);
    let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${hoursE}:${minutesE == 0 ? '00' : minutesE}"]`)[0].offsetTop;
    
    let ipStoreTime = `<input type="hidden" class="timeB" value="${timeStar}">
<input type="hidden" class="timeE" value="${timeEnd}">`;
    

    let eleTempalte = `
    <div class="sch-event ${opt.classCus.map(cl => `${cl}`).join(' ')}" style="top:${topPosY}px;height:${bottomPosY - topPosY}px">
        <div class="ev-top"><i class="bi bi-person-fill lb"></i> <p><strong>003</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, veritatis.</p></div>
        <div class="ev-body" style="background: ${opt.color};"></div>
        <div class="lbs">${opt.isNew ? '<span class="lb new">New</span>' : '' }${opt.cCount > 0 ? '<span class="lb"><i class="bi bi-slash-circle"></i> '+opt.cCount+'</span>' : '' }${opt.mess ? '<span class="lb"><i class="bi bi-bell"></i></span>' : '' }${opt.extra > 0 ? '<span class="lb">Ex+'+opt.extra+'</span>' :''}</div>
        
        <div class="actions"><a class="bi bi-trash" onclick=removeSch(this)></a><a class="bi bi-gear" onclick=OpenEditMenu(this)></a></div> 
        ${opt.isProcess ? '<span class="process"></span>' : '' }
        <a href="javascript:;" class="power-off"  onclick='removeSsAllEvent(this.parentElement,"booking")'><i class="bi bi-power"></i></a>
        ${ipStoreTime}
    </div>
    `;

    if(bottomPosY - topPosY == 0) return; 
    contEle.append(eleTempalte);
}
function addBlankTime(timeStar = '', timeEnd = '', operatory = 0){
    let contCell = $(eventStore).find('td:not(.time)').eq(operatory + 1);
    let contEle = contCell.children('.events');
    
    let hoursS = parseInt(timeStar.split(':')[0]);
    let minutesS = parseInt(timeStar.split(':')[1]);
    let topPosY = $(scheduleTable).find(`tr[data-date-time="${hoursS}:${minutesS == 0 ? '00' : minutesS}"]`)[0].offsetTop;
    
    let hoursE = parseInt(timeEnd.split(':')[0]);
    let minutesE = parseInt(timeEnd.split(':')[1]);
    let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${hoursE}:${minutesE == 0 ? '00' : minutesE}"]`)[0].offsetTop;
    
    let eleTempalte = `
    <div class="sch-event ev-blank" style="top:${topPosY}px;height:${bottomPosY - topPosY}px">
        <div class="ev-body" style="background: ${'#000'};"></div>
    </div>
    `;
    contEle.append(eleTempalte);
}
function draggSch(obj){
    let w = $('#table-schedule-time td:not(.time)').innerWidth() + 3;
    let h = $('#table-schedule-time td:not(.time)').innerHeight();
    let topStamp = 0;
    
    $(obj).draggable({
        scroll: true, 
        containment: "#table-schedule-time",
        refreshPositions: false,
        axis: "y",
        revert: false,
        zIndex: 10,
        create: function(e, ui){
            
        },
        drag: function(e, ui) {
            ui.position.left = 0;
            ui.position.top = Math.floor(ui.position.top/40)*40;
            checkOvertimeSingle(this);
            
        },
        start: function(e, ui) {
            dragscroll.reset();
            w = $('#table-schedule-time td:not(.time)').innerWidth() + 3;
            h = $('#table-schedule-time td:not(.time)').innerHeight();
            
            topStamp = ui.position.top;
           
            OtherEvent(this).forEach(function(obj, index){
                $(obj).addClass('highlight');
            });
            
        },
        stop: function(e, ui) {
            let currentEle = this;
            let posTp = currentEle.offsetTop;
            let posBt = currentEle.offsetTop + $(currentEle).innerHeight();
            let isRevert = false;
            OtherEvent(this).forEach(function(obj, index){
                let itTp = obj.offsetTop;
                let itBt= obj.offsetTop + $(obj).innerHeight();;
                if(posBt > itTp){
                    if(posTp < itBt){
                        isRevert = true;
                 
                        $(currentEle).animate({top: topStamp + 'px'}, function(){});
                    } else {}
                } else {}
                $(obj).removeClass('highlight');
            });
            inColEvent(this).forEach(function(obj, index){
                let itTp = obj.offsetTop;
                let itBt= obj.offsetTop + $(obj).innerHeight();
                if(posBt > itTp){
                    if(posTp < itBt){
                        isRevert = true;
                        $(currentEle).animate({top: topStamp + 'px'}, function(){});
                    } else {}
                } else {}
            });
            if(!isRevert){
                checkOvertimeSingle(currentEle); 
                console.log(timeByPositionY(ui.position.top));
                topStamp = 0;
            } else {
                setTimeout(function(){
                    checkOvertimeSingle(currentEle);
                    console.log(timeByPositionY(topStamp));
                    topStamp = 0;
                },300);//animate 300ms
                
            }
  
        }
    });
    if($(obj).hasClass('free-axis')){
        
           freeAxisOp(obj);
    }
    
}
function OpenEditMenu(obj){
    var $menu  = $('#menu-edit-user');
    $menu.addClass('open');
}
function removeSch(obj){
//    $(obj).closest('.sch-event').remove();
}
function freeAxisOp(obj){
    let $item =  $(obj).closest('.sch-event');
    $item.find('.ev-top').children('.lb').remove();
    let wframe = 0;
    let topStamp = 0;
    let leftStamp = 0;
    let revertClass= '';
    let revertHeight = 0;
    $item.draggable( "option", {
        axis : '',
        start: function( event, ui ) {
            dragscroll.reset();
            topStamp =  ui.position.top;
            leftStamp =  ui.position.left;
            revertHeight = $(this).innerHeight();
            wframe = $item.parent('.events').width();
            
            OtherEvent(this).forEach(function(obj, index){
                $(obj).addClass('highlight');
            });
            revertClass = checkDisableOp(this);
           
            
        },
        drag: function( event, ui ) {
            let obj = this;
            ui.position.left = Math.floor(ui.position.left/wframe)*wframe;
            ui.position.top = Math.floor(ui.position.top/40)*40;
            checkOvertimeSingle(this);
            
            let objLeft = this.offsetLeft + $(this).closest('td')[0].offsetLeft;
            $(eventStore).find('td').each(function(index,ele){
                let eleLeft = ele.offsetLeft;
                if(Math.round(objLeft/10) == Math.round(eleLeft/10)){
                    let typeNV = parseInt($(ele).data('type'));
                    updateEventByTier(obj,typeNV);
                }
            });
        },
        stop: function( event, ui ) {
            let currentEle = this;
            let posTp = currentEle.offsetTop;
            let posBt = currentEle.offsetTop + $(currentEle).innerHeight();
            let isRevert = false;
            
            if(ui.position.left != 0){
                isRevert = moveOpaSch(currentEle, topStamp, $(currentEle.parentElement), revertClass); 
            } else {
                // only time change
                inColEvent(this).forEach(function(obj, index){
                    let itTp = obj.offsetTop;
                    let itBt= obj.offsetTop + $(obj).innerHeight();;
                    if(posBt > itTp){
                        if(posTp < itBt){
                            isRevert = true;
                            $(currentEle).animate({top: topStamp + 'px', left: 0 + 'px'}, function(){});
                        } else {

                        }
                    } else {

                    }
                });
                OtherEvent(this).forEach(function(obj, index){
                    let itTp = obj.offsetTop;
                    let itBt= obj.offsetTop + $(obj).innerHeight();;
                    if(posBt > itTp){
                        if(posTp < itBt){
                            isRevert = true;
                            $(currentEle).animate({top: topStamp + 'px'});
                        } else {}
                    } else {}
                    $(obj).removeClass('highlight');
                });
            }
            clearAllHighlightCol(this);
            if(!isRevert){
                checkOvertimeSingle(currentEle);
                console.log(timeByPositionY(ui.position.top));
                topStamp = 0;
                
            } else {
                $(currentEle).css({height : revertHeight + 'px'});
                setTimeout(function(){
                    checkOvertimeSingle(currentEle); 
                    console.log(timeByPositionY(topStamp));
                    topStamp = 0;
                    
                },300)
            }
            
            
        }
        
    });
   
}
function moveOpaSch(obj, revertTop, revertCont, revertClass){
    let objLeft = obj.offsetLeft + $(obj).closest('td')[0].offsetLeft;
    let isRevert = false;
    $(eventStore).find('td').each(function(index,ele){
        let eleLeft = ele.offsetLeft;
        if(Math.round(objLeft/10) == Math.round(eleLeft/10)){
            if($(ele).hasClass(revertClass)){
                isRevert = true;
                $(obj).animate({top: revertTop + 'px', left: 0 + 'px'});
                revertCont.append(obj); 
                OtherEvent(obj).forEach(function(ele, index){$(ele).removeClass('highlight');});
            } else {
                let typeNV = parseInt($(ele).data('type'));

                updateEventByTier(obj,typeNV);
                
                $(ele).find('.events').append(obj);
                $(obj).css({left: 0});
                // recheck inColEvent
                let posTp = obj.offsetTop;
                let posBt = obj.offsetTop + $(obj).innerHeight();
                inColEvent(obj).forEach(function(ele, index){
                    let itTp = ele.offsetTop;
                    let itBt= ele.offsetTop + $(ele).innerHeight();
                    if(posBt > itTp){
                        if(posTp < itBt){
                            //revert
                            isRevert = true;
                            $(obj).animate({top: revertTop + 'px'}, function(){  
                            });
                            revertCont.append(obj);
                           
                        } else {}
                    } else {}
                });
                OtherEvent(obj).forEach(function(ele, index){
                    let itTp = ele.offsetTop;
                    let itBt= ele.offsetTop + $(ele).innerHeight();
                    $(ele).removeClass('highlight');
                    if(posBt > itTp){
                        if(posTp < itBt){
                            isRevert = true;
                           
                            $(obj).animate({top: revertTop + 'px'}, function(){
                              
                            });
                            revertCont.append(obj);
                     
                        } else {}
                    } else {}
                    
                });
            }
        } else {
            
        }

    });
    return isRevert;
}
function updateEventByTier(obj, tier){
    let rawB =  $(obj).find('input.timeB').val();
    let rawE_h = $(obj).find('input.timeE').val().split(':')[0];
    let rawE_m = $(obj).find('input.timeE').val().split(':')[1];
    let tierTime = 0;
    let newE_m = 0;
    
    switch (tier) {
        case 1:
            tierTime = 60;
            break;
        case 2:
            tierTime = 30;
            break;
        case 3:
            tierTime = 15;
            break;
        case 4:
            tierTime = 0;
            break;
        default:
            tierTime = 0;
    }
    newE_m = tierTime + parseInt(rawE_m);
    if(newE_m >= 60){
        rawE_h = parseInt(rawE_h) + 1;
        newE_m = parseInt(newE_m) - 60;
    }
    let topPosY = $(scheduleTable).find(`tr[data-date-time="${rawB}"]`)[0].offsetTop;
    let bottomPosY = $(scheduleTable).find(`tr[data-date-time="${rawE_h}:${newE_m == 0 ? '00' : newE_m}"]`)[0].offsetTop;
    $(obj).css({height : (bottomPosY - topPosY) + 'px'});
    
}


function checkDisableOp(obj){
    let objLeft = obj.offsetLeft + $(obj).closest('td')[0].offsetLeft;
    let objClass  = $(obj).attr('class').split(' ').filter(myClass =>{
        let mystring = myClass,
            expr = /sv-/;
        return expr.test(mystring);
    })[0]; // [0] = has only one class
    
    $(eventStore).find('td').each(function(index,ele){
        let eleLeft = ele.offsetLeft;
        if($(ele).hasClass(objClass)){
            createHighlightCol(ele);
        }
    });
    return objClass;
}
function createHighlightCol(obj){
    let $cont = $("#table-schedule-time").parent();
    let $hlCol = $('<div class="hl-colnhe"></div>');
    $cont.append($hlCol);
    $hlCol.css({width: $(obj).innerWidth()+'px',left:obj.offsetLeft+'px',top: 0});
}
function clearAllHighlightCol(obj){
    let $cont = $("#table-schedule-time").parent();
    $cont.find('.hl-colnhe').remove();
}
function removeSsAllEvent(obj, status = ''){
    removeSs(obj, status);
    OtherEvent(obj).forEach(function(ele,index){
         removeSs(ele, status);
    });
}
function removeSs(obj, status = ''){
    $(obj).removeClass(status);
}
//data functions
function autoFillInfo(obj){
    let stringArr = obj.textContent.split('/');
    let $cont = $('#info-user');
    $cont.find('input[name="user-name"]').val(stringArr[0].trim());
    $cont.find('input[name="user-phone"]').val(stringArr[1].trim());
    $cont.find('input[name="user-email"]').val(stringArr[2].trim());
    $(obj).closest('.search-user-result').hide();
    $('#input-search').val(''); 
}

function getNewService(obj){
    let $slservice = $('#addUser-selectService');
    let $slnhanvien = $('#addUser-selectOp');
    let $sltimestart = $('#addUser-selectTime');
    let $timeend = $('#addUser-ipTimeEnd');
}

//close sec side menu
$(document).on('click', '.menu-overlay' ,function(e){
	let $menu = $(this).closest('.sec-menu-side');
	$menu.removeClass('open');
});


/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add'+EventListener;
    var removeEventListener = 'remove'+EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function(i, el) {
        for (i = 0; i < dragged.length;) {
            el = dragged[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }
        // cloning into array since HTMLCollection is updated dynamically
        dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
        for (i = 0; i < dragged.length;) {
            (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                (cont = el.container || el)[addEventListener](
                    mousedown,
                    cont.md = function(e) {
                        if(e.which != 3){//check right press
                            if (!el.hasAttribute('nochilddrag') ||
                                _document.elementFromPoint(
                                    e.pageX, e.pageY
                                ) == cont
                            ) {
                                pushed = 1;
                                lastClientX = e.clientX;
                                lastClientY = e.clientY;

                                e.preventDefault();
                            }
                        }
                        
                    }, 0
                );

                _window[addEventListener](
                    mouseup, cont.mu = function() {pushed = 0;}, 0
                );

                _window[addEventListener](
                    mousemove,
                    cont.mm = function(e) {
                        if (pushed) {
                            (scroller = el.scroller||el).scrollLeft -=
                                newScrollX = (- lastClientX + (lastClientX=e.clientX));
                            scroller.scrollTop -=
                                newScrollY = (- lastClientY + (lastClientY=e.clientY));
                            if (el == _document.body) {
                                (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                scroller.scrollTop -= newScrollY;
                            }
                        }
                    }, 0
                );
             })(dragged[i++]);
        }
    }

      
    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));