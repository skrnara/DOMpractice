class Product{
    constructor(name, price, picture){
        this.name=name
        this.price=price
        this.picture=picture
    }
}

var listProduct=[
    new Product('Ocean Wave',450,'https://www.ikea.com/gb/en/images/products/vanligen-vase-jug-blue__0797965_PE767279_S5.JPG'),
    new Product('Rose Blush',600,'https://www.ikea.com/gb/en/images/products/gradvis-vase-pink__0524970_PE644685_S5.JPG'),
    new Product('Bone Ivory',1900,'https://www.ikea.com/gb/en/images/products/livsverk-vase-white__0704301_PE725359_S5.JPG')
]

var cart=[]

//PRODUCT TABLE
const printData=(x)=>{
    var output=''
    x.forEach((val, index)=>{
        output+=`<tr>
                    <td>${index+1}</td>
                    <td>${val.name}</td>
                    <td>$${val.price}</td>
                    <td><img src=${val.picture} alt="img" width="200px"></td>
                    <td>
                        <button onclick="addToCart(${index})">Add to cart</button>
                    </td>
                </tr>`
    })

    document.getElementById('printData').innerHTML=output
}
printData(listProduct)



//CART TABLE
const printCart=(x)=>{
    var quantity=0
    var totalPurchase=0
    var output=''
    x.forEach((val,index)=>{
        output+=`<tr>
                    <td>${index+1}</td>
                    <td>${val.name}</td>
                    <td>$${val.price}</td>
                    <td><img src="${val.picture}" alt="img" width="200px"></td>
                    <td><button onclick="deleteFromCart(${index})">Delete from cart</button></td>
                </tr>`
        quantity++//変更するとコードがなんとなく効かない。気をつけなきゃ
        totalPurchase+=val.price
    }) 
    document.getElementById('cart').innerHTML=output
    
    //CART HEADER
    if(quantity>0){
        document.getElementById('cartHeader').innerHTML=`You have ${quantity} item(s) in your cart<br>Your total of purchase is $${totalPurchase}`
        document.getElementById('checkout').innerHTML=`<button class="checkoutButton" onclick="startCountdown(),checkoutfunc()">Checkout</button>`
    }
    else if(quantity==0){
        document.getElementById('cartHeader').innerHTML=`Your cart is empty`
    }
}
printCart(cart)


const addToCart=(index)=>{
  cart.push(listProduct[index])   
  printCart(cart)    
}


const deleteFromCart=(index)=>{
    var deleteConfirmation=confirm('Are you sure you want to delete this from your cart?')
    if(deleteConfirmation){
        cart.splice(index,1)
        document.getElementById('checkout').innerHTML=''
    }
    printCart(cart)
}

const sum=(arr)=>{
    var output=0
    arr.forEach((item)=>{
        output+=item['price']
    })
    return output
}


var timeSpan=60
var timer=''

const startCountdown=()=>{
    timeSpan=timeSpan++
    timer=setInterval(time, 1000)
}

const time=()=>{
    timeSpan--
    document.getElementById('timerPlacement').innerHTML=`${timeSpan} second(s) remaining`

    if(timeSpan==0){
        clearInterval(timer)
        alert('You have surpassed the time limit. Please start over.')
        //Time over, reset data
        document.getElementById('cartHeader').innerHTML=`Your cart is empty`
        document.getElementById('timerPlacement').innerHTML=``
        document.getElementById('cart').innerHTML=``
        document.getElementById('checkout').innerHTML=``
        cart=[]
        time=60 //このifでいろいろリセットする
    }
}

const checkoutfunc=()=>{
    document.getElementById('checkout').innerHTML=`<input type="number" id="paymentInput" placeholder="Insert your money here"><button onclick="payment()">Pay</button>`
}

const payment=()=>{
    //IF MONEY IS NOT ENOUGH 
    if(document.getElementById('paymentInput').value<sum(cart)){
        alert(`Your money is not enough. You need $${Math.abs(document.getElementById('paymentInput').value-sum(cart))} more to complete the purchase.`)
    }
    //IF MONEY IS MORE THAN ENOUGH
    else if(document.getElementById('paymentInput').value>sum(cart)){
        clearInterval(timer)
        alert(`Thank you for your purchase. Here is your change \n$${document.getElementById('paymentInput').value-sum(cart)}`)
        // Purchase over, reset data
        document.getElementById('cartHeader').innerHTML=`Your cart is empty`
        document.getElementById('timerPlacement').innerHTML=``
        document.getElementById('cart').innerHTML=``
        document.getElementById('checkout').innerHTML=``
        cart=[]
        time=60 
    }
    //IF MONEY IS JUST THE RIGHT AMOUNT
    else if(document.getElementById('paymentInput').value==sum(cart)){
        clearInterval(timer)
        alert(`Thank you for your purchase.`)
        //Purchase over, reset data
        document.getElementById('cartHeader').innerHTML=`Your cart is empty`
        document.getElementById('timerPlacement').innerHTML=``
        document.getElementById('cart').innerHTML=``
        document.getElementById('checkout').innerHTML=``
        cart=[]
        time=60 
    }
}