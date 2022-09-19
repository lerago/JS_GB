'use strict';

const goods = [
   { title: 'Shirt', price: 150 },
   { title: 'Socks', price: 50 },
   { title: 'Jacket', price: 350 },
   { title: 'Shoes', price: 250 },
];

class GoodsItem {
   constructor({ title = " ", price = 0 }) {
      this.title = title;
      this.price = price;
   }

   render() {
      return `
      <div class="goods-item">
         <h3>${this.title}</h3>
         <p>${this.price}</p>
      </div>
      `
   }
}

class GoodsList {
   list = [];
   fetchGoods() {
      this.items = goods;
   }
   render() {
      const resultList = this.items.map(item => {
         const goodsItem = new GoodsItem(item);
         return goodsItem.render();
      });
      document.querySelector('.goods-list').innerHTML = resultList.join('');
   }

   sumPrice () {
      return this.items.reduce (function (acc, item) {
         return acc + item.price
      }, 0)
   }
}


const goodsList = new GoodsList ();
goodsList.fetchGoods();
goodsList.render();
const result = goodsList.sumPrice();
console.log(result);