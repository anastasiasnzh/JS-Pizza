/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    var API=require('./API');

    API.getPizzaList(function(err,pizza_list){
        if(err){
            return console.error(err);
        }console.log("Pizza List",pizza_list);
        PizzaCart.initialiseCart();
        PizzaMenu.initialiseMenu(pizza_list);
    })



    $("#order").click(function(){
        //API.createOrder({
        //    name: "",
        //    phone: "",
        //    pizza: PizzaCart.getPizzaInCart()
        //}, function(err,result){
        //    if(err){
        //        alert("Can't get order");
        //    }else{
                //or with link a href
        if($(".sidePanel").find(".allPizzasNumber").text()!='0'){
                window.location='/order.html';
        }
                //alert("Order created");
            //}
        //})
    })

    $("#next").click(function(){
        var validation1=0;
        var validation2=0;
        var validation3=0;
        //if{
        if(($("#name").val()=="")||($("#name").val().search(/[0-9]/i)!=-1)){
            $("#helpBlock1").removeClass('invisible');
            validation1=1;
            //var i=$("#name").value.search(/[0-9]/i);   ($("#name").value==null)||($("#name").value=="")||($("#name").value.search(/[0-9]/i)!=-1)
            //$("#helpBlock1").value(i)
            //$('#name').parent.find('.l').addClass('errorLabel');
            //$("#name").addClass("errorBorder");
        }else{
            $("#helpBlock1").addClass('invisible');
            validation1=0;
        }

        if(($("#phoneNumber").val()=="")||(($("#phoneNumber").val().substring(0,1)!='0')&&($("#phoneNumber").val().substring(0,4)!="+380"))){
            $("#helpBlock2").removeClass('invisible');
            validation2=1;
        }else{
            $("#helpBlock2").addClass('invisible');
            validation2=0;
        }
        if(($("#adress").val()=="")){
            $("#helpBlock3").removeClass('invisible');
            validation3=1;
        }else{
            $("#helpBlock3").addClass('invisible');
            validation3=0;
        }
    //}else{
        if(validation1==0&&validation2==0&&validation3==0){
        API.createOrder({
            name: $("#name").val(),
            phone: $("#phoneNumber").val(),
            adress: $("#adress").val(),
            pizza: PizzaCart.getPizzaInCart()
        }, function(err,result){
            if(err){
                alert("Can't get order");
            }else{
                LiqPayCheckout.init({
                    data: result.data,
                    signature:result.signature,
                    embedTo: "#liqpay",
                    mode: "popup"
                    // embed || popup
                    }).on("liqpay.callback", function(data){
                    console.log(data.status);
                    console.log(data);
                }).on("liqpay.ready", function(data){
                    // ready
                    }).on("liqpay.close", function(data){
                    // close
                    });

                }
        })
        }

    })

    require('./googleMap');
});

