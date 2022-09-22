'use strict';

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = "/catalogData.json";

const url = `${URL}${GOODS}`;

function service(url) {
   return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = () => {
         resolve(JSON.parse(xhr.response))
      };
      xhr.send();
   })
}


class GoodsItem {
   constructor({ product_name = " ", price = 0 }) {
      this.product_name = product_name;
      this.price = price;
   }

   render() {
      return `
      <div class="goods-item">
         <h3>${this.product_name}</h3>
         <p>${this.price}</p>
      </div>
      `
   }
}

class GoodsList {
   items = [];
   fetchGoods() {
      return new Promise((resolve) => {
      service(url).then ((data) => {
         this.items = data;
         resolve()
      })});
   }

   render() {
      const resultList = this.items.map(item => {
         const goodsItem = new GoodsItem(item);
         return goodsItem.render();
      });
      document.querySelector('.goods-list').innerHTML = resultList.join('');
   }

   sumPrice() {
      return this.items.reduce(function (acc, item) {
         return acc + item.price
      }, 0)
   }
}


const goodsList = new GoodsList();
goodsList.fetchGoods().then(() => {
   goodsList.render();
});

