import httpRequest from '../common/http.js';
import storage from '../common/storage.js';


httpRequest("/order/list", "GET").then(res => {
	let html = "";
	res.data.forEach(item => {
		html = html + `<tr >
																	<th scope="row">${item.orderNo}</th>
																	<td>${item.createtime}</td>
																	<td>${item.status}</td>
																	<td>£</span>${item.amount}</span>
													for ${item.total} items</td> 
																</tr> `
	})

	html ? '' : html = '<div  style="padding:20px;">no data</div>'
	$("#tbody").html(html);

}).catch().finally()
