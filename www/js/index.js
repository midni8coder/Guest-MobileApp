
var guestList =  [];
var baseAPIURL = "https://midni8coder.somee.com/api/guest/";
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    data:[
        {'name':'Devid L', 'id':1,'room':'B1 106 4'},
        {'name':'Ramesh Naik', 'id':2,'room':'B1 102 4'},
        {'name':'Devraj', 'id':3,'room':'B1 302 1'},
        {'name':'Samantha Reddy', 'id':3,'room':'B1 103 4'},
    ],
    getGuestList:function(){
        try
        {  
            $('#error').append('URL: ' + baseAPIURL+"common/GetGuestList");
            
            // $.get(baseAPIURL+"common/GetGuestList", function(data) {
            //     guestList = data;
            //     app.showGuestList();
            //   });   
              $.ajax({
				crossDomain: true,
				url: baseAPIURL+"common/GetGuestList",
				method: 'get',
				data: {},
				//contentType: 'json',
				success: function (response) {
                    $('#error').append('response: ' + response);
                    guestList = response;
                    app.showGuestList();
				},
				error: function (jqXhr, textStatus, errorMessage) { // error callback 
                            $('#error').append('Error: ' + errorMessage);
                            $('#error').append('<br>textStatus: ' + textStatus);
                            $('#error').append('<br>jqXhr: ' + JSON.stringify(jqXhr));
                        }
			}) 
        }
        catch(ex)
        {
            alert(ex.message);
        }
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        $('.modal-close').click(function(){
            $('.modal').hide();
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        // alert(StatusBar);
    },
    GetSortOrder: function(prop) {    
        return function(a, b) {    
            if (a[prop].toLowerCase() > b[prop].toLowerCase()) {    
                return 1;    
            } else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {    
                return -1;    
            }    
            return 0;    
        }    
    },
    onAccountEditClick:function(control,formID, type){
        
        if($(control).text().toLowerCase() == "edit"){
            $('i',control).text('done');
            $.each($('input:visible','#'+formID), function(id,value){
                $(value).removeAttr('disabled');
                $(value).parent().removeClass("ui-state-disabled");;
            })
        }
        else
        {
            $('i',control).text('edit');
            $.each($('input:visible','#'+formID), function(id,value){
                $(value).attr('disabled','disabled');
                $(value).parent().addClass("ui-state-disabled");
            });
            M.toast({html: '<p class="g-toast g-toast-success">Data Updated..!!</p>'})
        }
        
    },
    showExpenditure:function(divID, filter){
        
    },
    showGuestList:function(){
        try
        {
            $('<ul id="guestList" data-role="listview" data-filter="true" data-inset="true" data-autodividers="true" ></ul>').appendTo('#divGuestList');
            $.each(guestList.sort(this.GetSortOrder("FULLNAME")), function(id, value){
                $('<li>'+value.FULLNAME+'</li>').appendTo('#guestList');
            });
        }
        catch(ex)
        {
            alert(ex.message);
        }
    },
    adjustModalFields:function (){
            app.showLoader();
            // $('.modal').hide();
            setTimeout(function(){
                if($('.modal div[class*=ui]').length > 0){
                    $.each($('.modal input'),function(i,element){
                        $(element).parent().remove();
                        $(element).insertAfter($(element).parent().prev());
                    });
                }
                $('.modal').show();
                $.mobile.loading('hide');
                // $('#jqLoader').hide();
            },1500);
        
    },
    showLoader:function(){
        var element=$('#jqLoader'),
            theme =element.jqmData('theme'),
            msgTxt = element.jqmData('msgtext'),
            txtVisible =element.jqmData('text-visible'),
            textonly =element.jqmData('textonly'),
            html =element.jqmData('html') || '';
            $.mobile.loading('show',{
                text:msgTxt,
                textVisible:txtVisible,
                theme:theme,
                textonly:textonly,
                html:html
            });
    },
    addNewGuest:function(control){
        var newGuest = {};
        if(control)
        {
        //    var name =  $(control).closest('#guestName').val();
        newGuest.name = $('#guestName').val();
        $('#guestName').val('');
        }
        else
        {
            newGuest.name = "New Guest "+(this.data.length+1);
            newGuest.id = this.data.length+1;
            newGuest.room = "Room "+(this.data.length+1);
        }
        this.data.push(newGuest);
        $('#linkAddGuestClose').click();
        $('#guestList').empty();
        $.each(this.data.sort(this.GetSortOrder("name")), function(id, value){
            $('<li>'+value.name+'</li>').appendTo('#guestList');
        });
        //$('<li>'+newGuest.name+'</li>').appendTo('#guestList');
        $("#guestList").listview().listview('refresh'); //.append(output)
    },
    AddNewGuestSubmit:function(){
        alert('submitting')
    },
    renderChart:function() {

        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Desktop Browser Market Share in 2016"
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: 51.08, label: "Chrome" },
                    { y: 27.34, label: "Internet Explorer" },
                    { y: 10.62, label: "Firefox" },
                    { y: 5.02, label: "Microsoft Edge" },
                    { y: 4.07, label: "Safari" },
                    { y: 1.22, label: "Opera" },
                    { y: 0.44, label: "Others" }
                ]
            }]
        });
        chart.render();
        
        }
};
