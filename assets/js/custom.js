function feedback(){
    document.getElementById('feedbackArea').innerHTML=
        '<textarea rows="3" autofocus style="color:black;width:100%;margin-top:30px;"> </textarea>'+
        '<button class="btn btn-danger btn-block">Submit</button>';
}
function calc(){
    var prices =""
    var inputs = document.getElementsByClassName( 'priceArray' ),

     prices = [].map.call(inputs, function( input ) {
       if(input.value!="")
        return input.value;
        else
        return 0;
    }).join(',');
    var data = new Array();
    data = prices.split(',');
    console.log(data)
   var totalPrice = 0;
    /* price calculation */
    for(var i=0;i<data.length;i++){
        if(parseInt(data[i])!=null)
        totalPrice += parseInt(data[i]);
        else
        alert("Null not accepted")
    }
    console.log(totalPrice);
    var stateTax = totalPrice * 0.08;
    var Tax = totalPrice * 0.05;
    totalPrice += stateTax + Tax
    document.getElementById('STax').innerText = stateTax;
    document.getElementById('Tax').innerText = Tax;
    document.getElementById('Final').innerText = totalPrice;
}

function intoTons(weightInKilos){
weightInKilos = parseFloat(weightInKilos);
    $("#inTons").html(Math.round(weightInKilos/907.18474)+"Tons");
}

function getV2(weight,type){

    let error=false;
    let v2,flaps;
    let maxLandingWeight,flagPos=0;
    console.log(weight+" "+type);
if(isNaN(weight)||isNaN(type)||weight==null||type==null)
{
    throw Error('The given argument is not a number');
    error = true;
    flagPos=1;
    alert("Please Enter a valid input");
}
if(!error){
    weight = parseFloat(weight);
    weightinTons = weight/907.18474
    type = parseInt(type);

    switch (type) {
        case 400:
        if(weightinTons>33.650)
        {  
            v2 = 100+(weightinTons-15);
            maxLandingWeight= 56240;
            flaps=5;
        }else{error=true;}
            break;
        case 700:
        if(weightinTons>37.648&&weightinTons<70.080)
        {  
            v2 = 100+(weightinTons-25);
            maxLandingWeight=58604;
        flaps=2;
        }else{error=true;}
            break;
        case 800:
        if(weightinTons>41.145&&weightinTons<78.245)
        {  
            v2 = 100+(weightinTons-20);
            maxLandingWeight = 65317;
        flaps=3;
        }else{error=true;}   
            break;
        default:
            v2 = 0;
            error=true;
            break;
    }
}
    if(error==false){
    $('#TSpeed').text(Math.ceil(v2)+"Knots");
    $('#TWeight').text(weight+"Kilos");
    $('#TFlaps').text(flaps);
    $('#TLW').text(maxLandingWeight+"Kilos");
    }else if(error==true&&flagPos==0){
        throw Error('The given argument is not a valid weight to flight combination');
        alert("Please Enter a valid input");
    }
    else if(error==true&&flagPos==1){
        throw Error('The given argument is not a number');
        alert("Please Enter a valid input");
    }
    return Math.ceil(v2);
}

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('').addClass('priceArray');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	});
});
