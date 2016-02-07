/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage=require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом

    //function pizzaAlreadyInBusket(cart_item) {
    //    var html_code = Templates.PizzaCart_OneItem(cart_item);
    //
    //    var $node = $(html_code);
    //
    //    var sideName = $node.find("h4");
    //
    //    $cart.append($node);
    //}
    //
    //Cart.forEach(pizzaAlreadyInBusket);
    //var id=-1;
    function isInCart(Cart, pizza, size){
        for(var i=0;i<Cart.length;i++){
            if((Cart[i].pizza==pizza)&&(Cart[i].size==size)) return i;
        //
        }
        return -1;
    }

    if(isInCart(Cart,pizza,size)!=-1){
        Cart[isInCart(Cart,pizza,size)].quantity += 1;
    }else{
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    var new_number = $(".sidePanel").find(".allPizzasNumber").text();
    new_number=parseInt(new_number)+1;
    $(".sidePanel").find(".allPizzasNumber").text(new_number);
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

//function checkIfAlreadyInBusket(main_name){
//    function checkOne(main_name){
//        var html_code = Templates.PizzaCart_OneItem(cart_item);
//            var $node = $(html_code);
//            var sideName = $node.find("h4");
//        if(sideName==main_name){
//
//        }
//    }
//}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    var saved_pizza=Storage.get('cart');
    if(saved_pizza){
        Cart=saved_pizza;
    }


    var saved_number=Storage.get("number_sidePanel");
    if(saved_number){
        $(".sidePanel").find(".allPizzasNumber").text(saved_number)
    }

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    var nu = $(".sidePanel").find(".allPizzasNumber").text();
    Storage.set("number_sidePanel",nu);

    Storage.set("cart",Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;