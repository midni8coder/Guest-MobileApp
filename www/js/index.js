
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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        alert(StatusBar);
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
    onEditClick:function(control,formID, type){
        
        if($(control).text().toLowerCase() == "edit"){
            $(control).removeClass('ui-icon-edit').addClass('ui-icon-check').text('Save');
            // $('[name="name"]','#'+formID).removeAttr('disabled');
            // $('[name="name"]','#'+formID).parent().removeClass("ui-state-disabled");
            $.each($('input:visible','#'+formID), function(id,value){
                $(value).removeAttr('disabled');
                $(value).parent().removeClass("ui-state-disabled");;
            })
        }
        else
        {
            $(control).removeClass('ui-icon-check').addClass('ui-icon-edit').text('Edit');
            // $('[name="name"]','#'+formID).attr('disabled','disabled');
            // $('[name="name"]','#'+formID).parent().addClass("ui-state-disabled");
            $.each($('input:visible','#'+formID), function(id,value){
                $(value).attr('disabled','disabled');
                $(value).parent().addClass("ui-state-disabled");
            })
        }
        
    },
    showGuestList:function(){
        //alert('called'+this.data.length);
        $('<ul id="guestList" data-role="listview" data-filter="true" data-inset="true" data-autodividers="true" ></ul>').appendTo('#divGuestList');
        $.each(this.data.sort(this.GetSortOrder("name")), function(id, value){
            $('<li>'+value.name+'</li>').appendTo('#guestList');
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
