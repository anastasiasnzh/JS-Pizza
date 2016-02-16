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
        API.createOrder({
            name: "",
            phone: "",
            pizza: PizzaCart.getPizzaInCart()
        }, function(err,result){
            if(err){
                alert("Can't get order");
            }else{
                //or with link a href
                window.location='/order.html';
                //alert("Order created");
            }
        })
    })

    $("#next").click(function(){

        if(($("#name").value==null)||($("#name").value=="")||($("#name").value.search(/[0-9]/i)!=-1)){
            $("#helpBlock1").removeClass('invisible');
            //var i=$("#name").value.search(/[0-9]/i);   ($("#name").value==null)||($("#name").value=="")||($("#name").value.search(/[0-9]/i)!=-1)
            //$("#helpBlock1").value(i)
            //$('#name').parent.find('.l').addClass('errorLabel');
            //$("#name").addClass("errorBorder");
        }

        if(($("#phoneNumber").value==null)||($("#phoneNumber").value=="")||(($("#phoneNumber").value.charAt[0]!=0)&&($("#phoneNumber").value.substring(0,4)!="+380"))){
            $("#helpBlock2").removeClass('invisible');
        }
        if(($("#adress").value==null)||($("#adress").value=="")){
            $("#helpBlock3").removeClass('invisible');
        }
    })
});

