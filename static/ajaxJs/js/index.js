import httpRequest from '../common/http.js';
import storage from '../common/storage.js';
import fit from '../common/fit.js';



/**
 * @Description:首页
 * @author:Howe
 * @param 商品列表
 * @return
 * @createTime: 2024-11-05 10:00:58
 * @Copyright by 红逸
 */


$(document).ready(function() {
	category()
});

/**
 * @Description:商品类型
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-27 16:33:44
 * @Copyright by 红逸
 */
const getRecommendList1 = async (type, id) => {
	await httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: type,
		// categoryId: id
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + `<div class="slick-single-layout">
								<div class="axil-product product-style-four">
									<div class="thumbnail"><a  href="details/${item.linkTitle}" >
									
									<img data-sal="zoom-out" class="product-img"  style="object-fit:contain;background-color:#fff;"  
												src="${item.image}" alt="${item.name}" > </a>
									</div>
									<div class="product-content">
										<div class="inner">
											<h5 class="title ellipsis-multiline2"><a  class="ellipsis-multiline2" href="details/${item.linkTitle}">${item.name}</a></h5>
											<div class="product-price-variant"><span
													class="price old-price">$${item.price}</span><span
													class="price current-price">$${item.selling_price}</span></div>
										</div>
									</div>
								</div>
							</div>`
		})
		$(`#response-product_${type}`).html(html);

	}).catch().finally()
}



const getRecommendList2 = async (type, id) => {
	await httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: type,
		// categoryId: id
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + `	<div class="col-xl-3 col-lg-4 col-sm-6"  style="margin-bottom:40px">
								<div class="axil-product product-style-seven">
									<div class="product-content">
										<div class="inner">
										<h5 class="title ellipsis-multiline2"><a   href="details/${item.linkTitle}">${item.name}</a></h5>
																					<div class="product-price-variant"><span
													class="price current-price">$${item.selling_price}</span><span
													class="price old-price">$${item.price}</span></div>
											<div class="product-rating"><span class="icon">
										<i class="${item.score>=1?'fas fa-star':'far fa-star'}"  ></i>
										<i class="${item.score>=2?'fas fa-star':'far fa-star'}"  ></i>
										<i class="${item.score>=3?'fas fa-star':'far fa-star'}"  ></i>
										<i class="${item.score>=4?'fas fa-star':'far fa-star'}"  ></i>
										<i class="${item.score>=5?'fas fa-star':'far fa-star'}"  ></i>
										  
											 </span>
											</div>
										</div>
									</div>
									<div class="thumbnail"  style="padding:30px;"><a  href="details/${item.linkTitle}"  ><img data-sal="zoom-out"
									 class="product-img"
												data-sal-delay="100" data-sal-duration="800" loading="lazy"   
												style="object-fit:contain;box-sizing: border-box;"  
												src="${item.image}" alt="${item.name}" ></a></div>
								</div>
							</div>`
		})
		$(`#response-product_${type}`).html(html);
	}).catch().finally()
}


const getRecommendList3 = async (type, id) => {
	await httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: type,
		// categoryId: id
	}).then(res => {

		let html = "";
		res.data.forEach(item => {
			html = html + `<div class="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30">
								<div class="axil-product product-style-one">
								<div class="thumbnail"><a  href="details/${item.linkTitle}" >
								
								<img data-sal="zoom-out" class="product-img"  style="object-fit:contain;background-color:#fff;"  
											src="${item.image}" alt="${item.name}" > </a>
								</div> 
									<div class="product-content">
										<div class="inner">
											<h5 class="title ellipsis-multiline2"><a  class="ellipsis-multiline2" href="details/${item.linkTitle}">${item.name}</a></h5>
										<div class="product-price-variant"><span
												class="price old-price">$${item.price}</span><span
												class="price current-price">$${item.selling_price}</span></div>
										</div>
									</div>
								</div>
							</div> `
		})
		$(`#response-product_${type}`).html(html);
	}).catch().finally()
}


const getRecommendList4 = async (type, id) => {
	await httpRequest("/goods/recommendList", "GET", {
		limit: 12,
		type: type,
		// categoryId: id
	}).then(res => {
		let html = "";
		res.data.forEach(item => {
			html = html + `<div class="slick-single-layout">
							<div class="axil-product product-style-two has-color-pick">
								<div class="thumbnail">
								<a  href="details/${item.linkTitle}" > 
								<img data-sal="zoom-out" class="product-img"  style="object-fit:contain;background-color:#fff;"  
											src="${item.image}" alt="${item.name}" > 
											</a>
								</div>
								<div class="product-content">
									<div class="inner"> 
									<div class="product-rating"><span class="icon">
									<i class="${item.score>=1?'fas fa-star':'far fa-star'}"  ></i>
									<i class="${item.score>=2?'fas fa-star':'far fa-star'}"  ></i>
									<i class="${item.score>=3?'fas fa-star':'far fa-star'}"  ></i>
									<i class="${item.score>=4?'fas fa-star':'far fa-star'}"  ></i>
									<i class="${item.score>=5?'fas fa-star':'far fa-star'}"  ></i>
									  
										 </span>
										</div>
										<h5 class="title ellipsis-multiline2"><a  class="ellipsis-multiline2" href="details/${item.linkTitle}">${item.name}</a></h5>
										<div class="product-price-variant"><span
												class="price old-price">$${item.price}</span><span
												class="price current-price">$${item.selling_price}</span></div>
									</div> 
								</div>
							</div>
						</div>  
		 `
		})
		$(`#response-product_${type}`).html(html);
	}).catch().finally()
}

// 商品分类 随机取
const category = async () => {
	var category_list = storage.getStorageData("category_list");

	/*if (!category_list.length) {*/
		await httpRequest("/goods_category/list", "GET").then(res => {
			category_list = res.data;
			storage.setStorageData("category_list", category_list);
		}).catch().finally()
	/*}*/
	var categorys = [];
	category_list.forEach(item => {
		if (item.children && item.children.length) {
			item.children.forEach(listitem => {
				categorys.push(listitem)
			})
		}
	});

	// 随机取categorys中的3个
	let randomCategorys = [];
	for (let i = 0; i < 3; i++) {
		let index = Math.floor(Math.random() * categorys.length);
		randomCategorys.push(categorys[index]);
		categorys.splice(index, 1);
	}

	await getRecommendList1(3, randomCategorys[0].id)
	await getRecommendList2(2, randomCategorys[0].id)
	await getRecommendList3(1, randomCategorys[0].id)
	await getRecommendList4(4, randomCategorys[0].id)
	window.adaptImgHeight()

	setTimeout(() => {
		$(".new-arrivals-product-activation").slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			dots: false,
			prevArrow: '<button title="prev" class="slide-arrow prev-arrow"><i class="las la-angle-left"></i></button>',
			nextArrow: '<button title="next" class="slide-arrow next-arrow"><i class="las la-angle-right"></i></button>',
			responsive: [{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	}, 100)

	// getRecommendList(4, randomCategorys[0].id)
	// getRecommendList(6, randomCategorys[0].id)



	randomCategorys.forEach((item, index) => {
		let name = item.name.replace(/ /g, "_");
		let html = `<a  href="shop-list?id=${item.id}&title=`+name+`">${item.name}</a>`

		$(`.random_classify_${index+1}`).html(html)
	})

	/*let html = "";
	// 全部分类
	categorys.forEach((item, index) => {

		let img = index+1%9;

		 html += `<div class="slick-single-layout slick-slide">
							<div class="categrie-product-2"><a href="#">
							<img class="img-fluid" src="static/picture/furni-`+ img +`.png" alt="product categorie">
							<h6 class="cat-title">${item.name}</h6>
							</a>
							</div></div>`

	})

	$(`.response-category`).html(html);*/

}

window.adaptImgHeight = () => {
	setTimeout(() => {
		fit.adaptImgHeight(".product-img", 1);

		//sal 显示图片
		sal({
			threshold: 0.3,
			once: true
		})
	}, 200)
}
