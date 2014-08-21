$(document).on("ready", function(){
	main.init();
});

var main = {
	_default: {
		app_coms: {
			"Free": 3,
			"$0.99": 5,
			"$1.99": 6,
			"$2.99": 7
		},
		app_review: [
			{
				"lang": "English",
				"count": 249,
				"price": 89
			},
			{
				"lang": "Dutch",
				"count": 69,
				"price": 25
			},
			{
				"lang": "Russian",
				"count": 66,
				"price": 24
			},
			{
				"lang": "Japanese",
				"count": 62,
				"price": 22
			},
			{
				"lang": "Chinese",
				"count": 47,
				"price": 17
			},
			{
				"lang": "Italian",
				"count": 35,
				"price": 13
			},
			{
				"lang": "Spanish",
				"count": 32,
				"price": 12
			},
			{
				"lang": "French",
				"count": 31,
				"price": 11
			},
			{
				"lang": "Czech",
				"count": 18,
				"price": 6
			},
			{
				"lang": "Netherlandis",
				"count": 17,
				"price": 6
			},
			{
				"lang": "Portuguese",
				"count": 17,
				"price": 6
			},
			{
				"lang": "Polish",
				"count": 12,
				"price": 4
			},
			{
				"lang": "Sweden",
				"count": 8,
				"price": 3
			},
			{
				"lang": "Indonesian",
				"count": 7,
				"price": 3
			},
			{
				"lang": "Korean",
				"count": 7,
				"price": 3
			},
			{
				"lang": "Arabic",
				"count": 5,
				"price": 2
			},
			{
				"lang": "Israelite",
				"count": 6,
				"price": 2
			},
			{
				"lang": "Danish",
				"count": 5,
				"price": 2
			},
			{
				"lang": "Finnish",
				"count": 4,
				"price": 1
			},
			{
				"lang": "Turkish",
				"count": 4,
				"price": 1
			},
			{
				"lang": "Hungarian",
				"count": 2,
				"price": 1
			},
			{
				"lang": "Greek",
				"count": 2,
				"price": 1
			},
			{
				"lang": "Romanian",
				"count": 2,
				"price": 1
			},
			{
				"lang": "Serbian",
				"count": 2,
				"price": 1
			},
			{
				"lang": "Slovak",
				"count": 1,
				"price": 1
			},
			{
				"lang": "Norwegian",
				"count": 1,
				"price": 1
			}
		],
		app_data: {}
	},
	init: function(){
		main.check_url();
		window.addEventListener('popstate', function(event) {
			main.check_url();
	    });
		main.recheck_price();
		$("body").on("click", function(){
			var select = $(".selectbox .options");
			if(select.hasClass("open")){
				select.hide().removeClass("open").html("");
				select.prev().removeClass("open");
			}
		}).on("click", "a.navigation", function(event){
			event.preventDefault();
			var url = $(this).attr("href");
			history.pushState(null, null, url);
			main.load_url(url);
		}).on("click", ".selectbox .current", function(event){
			event.stopPropagation();
			var opt = $(this).next();
			if(opt.hasClass("open")){
				$(this).removeClass("open");
				opt.hide().removeClass("open").html("");
			} else {
				$(this).addClass("open");
				var data = opt.data("options").split("|");
				for (var i = 0; i < data.length; i++){
					if($(this).find("span").html()!=data[i]){
						opt.append("<li>"+data[i]+"</li>");
					}
				};
				opt.show().addClass("open");
			}
		}).on("click", ".selectbox li", function(event){
			event.stopPropagation();
			var current = $(this).parent().prev();
			current.find("span").html($(this).text());
			current.find("input").val($(this).text());
			current.removeClass("open");
			$(this).parent().hide().removeClass("open").html("");
			main.recheck_price();
		}).on("focusout", ".form_line input", function(){
			var status = false;
			if($(this).attr("type")==="email"){
				var email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				status = email.test($(this).val());
			} else if($(this).attr("type")==="text"){
				if($(this).val().length>1){
					status = true;
				} else {
					status = false;
				}
			} else if($(this).attr("type")==="url"){
				if(main.check_app_url($(this).closest("form"))){
					status = true;
				} else {
					status = false;
				}
			}
			if(status){
				if(!$(this).parent().hasClass("check")){
					$(this).parent().removeClass("uncheck");
					$(this).parent().addClass("check");
				}
			} else {
				$(this).parent().removeClass("check");
				$(this).parent().addClass("uncheck");
			}
		}).on("keyup paste change input", ".note-col textarea", function(){
			this.style.height = "0px";
			this.style.height = this.scrollHeight + "px";
		});
	},
	recheck_price: function(){
		if($(".safe_coms-form").length>0){
			var myapp = $("body").find("input[name='myapp']").val();
			var count = $("body").find("input[name='count']").val();
			var price = $(".safe_coms-form .price");
			var price_val = (main._default.app_coms[myapp]*count).toFixed(2).replace(".00", "");
			price_val = "$"+price_val;
			price.find("input").val(price_val);
			price.find("b").text(price_val);
		}
	},
	request_price: function(el){
		if(main.check_app_url(el)){
			var data_send = {
				"user_name": $(el).find("input[name='name']").val(),
				"user_mail": $(el).find("input[name='email']").val(),
				"app_link": $(el).find("input[name='itunes']").val()
			};
			main.send_data(data_send);
		}
	},
	comments_order: function(el){
		$(el).parent().parent().hide().next().show();
	},
	request_app: function(step, el){
		if(step==="app_info"){
			main.app_url(el);
		} else if(step==="comment_info"){
			main.comment_page();
		}
	},
	check_app_url: function(el){
		var par = $(el).find("input[name='itunes']").parent();
		var url=$(el).find("input[name='itunes']").val().replace(/[ ]/g,"");
		if(url==""){ 
			par.addClass("uncheck");
			return false;
		} else if(url.indexOf("/app/")<0){
			par.addClass("uncheck");
			return false;
		} else {
		    var id=url;
		    var end= id.indexOf("?");
		    var begin = id.indexOf("/id");
		    if(begin!=-1){
		        if(end==-1){
		            id=id.substring(begin+3);
		        } else {
		            id=id.substring(begin+3,end);
		        }
		        par.removeClass("uncheck").addClass("check");
		        main._default.app_data.id = id;
		        main._default.app_data.url = url;
		        return true;
		    } else {
		        par.addClass("uncheck");
		        return false;
		    }
		}
	},
	app_url: function(el){
		if($(".form_line.check").length == $(".form_line").length){
			main.get_itunes(main._default.app_data.id,main._default.app_data.url);
			main.change_step(1);
		}
	},
	get_itunes: function(id,url){
		var cont = $(".cont-app_info");
		cont.find(".image img").remove();
		cont.find(".price").html("Loading");
		cont.find(".category a").html("Loading").attr("title", "Loading").attr("href", "#");
		cont.find(".stars span").attr("data-rating", "0");
		cont.find(".user i").html("Loading");
		appurl=url;
		appid=id;
		$.ajax({
		    url: "http://itunes.apple.com/lookup?id="+id,
		    type: "post",
		    dataType:"jsonp",  
		    jsonp:"callback",  
		    success:function(data){
		    	var rating = data.results[0].averageUserRating;
		    	var urating = data.results[0].userRatingCount;
		    	if(!rating){var rating=0;}
		    	if(!urating){var urating=0;}
		    	var imgs = new Image();
		    	imgs.onload = function(){
		    		cont.find(".image").append("<img src='"+imgs.src+"' />")
		    	};
		    	imgs.src = data.results[0].artworkUrl100;
		    	var price = data.results[0].formattedPrice;
		    	cont.find(".price").html(price);
		    	cont.find(".category a").html(data.results[0].primaryGenreName).attr("title", data.results[0].primaryGenreName).attr("href", "https://itunes.apple.com/ru/genre/id"+data.results[0].primaryGenreId);
		    	cont.find(".stars span").attr("data-rating", rating);
		    	cont.find(".user i").html(urating);
		    	$(".uwant_coms h5").find("i").html(rating);
		    	if(rating===5){var improve = "keep";} else {var improve = "improve";}
		    	$(".uwant_coms h5").find("b").html(improve);
		    	$(".uwant_coms div[data-coms]").each(function(){
		    		var count = $(this).data("coms");
		    		var coms = count + " positive comments $" + (count*main._default.app_coms[price]);
		    		var coms_b = count + " positive comments <b>$" + (count*main._default.app_coms[price]) + "</b>";
		    		$(this).find("input").val(coms);
		    		$(this).find("label").html(coms_b);
		    	});
		    },
		    error: function(xmlHttpRequest, textStatus, errorThrown){
		    	alert("error"+textStatus + errorThrown);
		    }
		});
	},
	comment_page: function(){
		var count = $(".safe_coms-form").find("input[name='count']").val();
		var app_p = $(".safe_coms-form").find("input[name='myapp']").val();
		var price = $(".safe_coms-form").find("input[name='price']").val();
		$(".checkout_line[data-type='comments']").find("b").html(count);
		$(".checkout_line[data-type='comments']").find(".price").html(price);
		$(".total_line").html(price);
		var data_send = {
			"comment_count": count,
			"comment_price": price,
			"user_name": $("input[name='name']").val(),
			"user_mail": $("input[name='email']").val(),
			"app_link": $("input[name='itunes']").val(),
			"app_price":  app_p
		};
		main.change_step(1);
		main.send_data(data_send);
	},
	to_finish: function(){
		var request_price = 0;
		if($(".lang_step-add").length>0){
			var lang = $("input[name='langs']").val();
			request_price = parseInt($(".lang_table-total").find(".price").html().substr(1));
		} else {
			if($("input[name='langs']").val()!=="Full"){
				var lang = $("input[name='langs']").val();
				var id = "No found";
				for (var i = 0; i < main._default.app_review.length; i++) {
					if (main._default.app_review[i].lang === lang){id = i; break;}
				}
				request_price = main._default.app_review[id].price;
			} else {
				var lang = $("input[name='langs']").val();
				for (var i = 0; i < main._default.app_review.length; i++) {request_price += main._default.app_review[i].price;}
			}
		}
		var comment_price = 0;
		var com_count = 0;
		$(".cont-app_finish").find(".checkout_line[data-type='requests'] .price").html("$"+request_price);
		var com_block = $(".cont-app_finish").find(".checkout_line[data-type='comments']");
		if($("input[name='app-coms']").is(":checked") && $("input[name='app-coms']:checked").val()!=="I do not want positive comments"){
			com_block.show();
			$(".finish_next").find(".item[data-type='comments']").show();
			com_count = $("input[name='app-coms']:checked").parent().data("coms");
			com_block.find("b").html(com_count);
			comment_price = main._default.app_coms[$(".app_col .price").html()]*com_count;
			com_block.find(".price").html("$"+comment_price);
		} else {
			com_block.hide();
			$(".finish_next").find(".item[data-type='comments']").hide();
		}
		var total_price = parseInt(request_price) + parseInt(comment_price);
		$(".cont-app_finish .total_line").html("$"+total_price);
		var data_send = {
			"lang": lang,
			"request_price": request_price,
			"comment_count": com_count,
			"comment_price": comment_price,
			"user_name": $("input[name='name']").val(),
			"user_mail": $("input[name='email']").val(),
			"app_link": $("input[name='itunes']").val(),
			"app_img": $(".app_col").find("img").attr("src"),
			"app_price":  $(".app_col").find(".price").html(),
			"app_category": $(".app_col").find(".category a").text(),
			"app_rating": $(".app_col").find(".stars span").data("rating"),
			"app_userrt": $(".app_col").find(".user i").text(),
			"app_whatdo": $("textarea[name='app-doit']").val(),
			"app_ucoms": $("textarea[name='app-ucoms']").val()
		};
		main.change_step(1);
		main.send_data(data_send);
	},
	change_step: function(n){
		var count = $(".app_request-frames").find(".frame_one").length+1;
		var current = $(".app_request-frames").find(".frame_one.active");
		var cur_step = parseInt(current.data("step"));
		var new_step = cur_step + n;
		if(new_step>0 && new_step<count){
			current.fadeOut(100, function(){
				$(this).removeClass("active");
				$(".app_request-frames").find("div[data-step='"+new_step+"']").fadeIn(100, function(){
					$(this).addClass("active");
				});
			});
			$(".app_request-steps").find("li.active").removeClass("active");
			$(".app_request-steps").find("li[data-step='"+new_step+"']").addClass("active");
		}
	},
	next_lang: function(){
		if($("input[name='langes']").is(":checked")){
			main.change_step(1);
		} else {
			alert("Select the languages ​​you need");
		}
	},
	init_lang: function(){
		var table = $(".lang_table").find(".table_body");
		$("body").on("change click", "input[name='langes']", function(){
			main.custom_calc();
		});
		table.html("");
		for (var i = 0; i < main._default.app_review.length; i++) {
			table.append("<div class='table_row clearfix'><div class='lang'><input type='checkbox' name='langes' id='al-id"+i+"' value='"+main._default.app_review[i].lang+"' /><span></span><label for='al-id"+i+"'>"+main._default.app_review[i].lang+"</label></div><div class='sites'>"+main._default.app_review[i].count+" sites</div><div class='price'>$"+main._default.app_review[i].price+"</div></div>");
		}
		$(".lang_table-total").find(".sites").html("0 sites");
		$(".lang_table-total").find(".price").html("$0");
	},
	init_spin: function(){
		$(".g-spinner").spinner({
			min: 5,
			max: 40,
			step: 5,
			create: function(){
				main.recheck_price();
			},
			stop: function( event, ui ) {
				main.recheck_price();
			}
		});
	},
	custom_calc: function(){
		var sites = 0;
		var price = 0;
		var languag = [];
		if($("input[name='langes']:checked").length>0){
			$(".lang_table").find("input[name='langes']:checked").each(function(){
				sites += parseInt($(this).parent().next().html());
				price += parseInt($(this).parent().next().next().html().substr(1));
				$(".lang_table-total").find(".sites").html(sites+" sites");
				$(".lang_table-total").find(".price").html("$"+price);
				languag.push($(this).val());
				$(".lang_table").find("input[name='langs']").val(languag.join(', '));
			});
		} else {
			$(".lang_table-total").find(".sites").html("0 sites");
			$(".lang_table-total").find(".price").html("$0");
			$(".lang_table").find("input[name='langs']").val("");
		}
	},
	check_url: function(){
		var page = window.location.pathname;
		main.load_url(page);
	},
	load_url: function(page){
		var curpage = page;
		if(curpage==="/"){
			curpage="main";
		} else {
			curpage=curpage.substr(1)
		}
		curpage = curpage.replace(/[\/]/g,"-") + ".html";
		var container = $(".block-body");
		container.addClass("loading").html("");
  		var posting = $.post( "/mockup/pages/route.php", {page: curpage});
		posting.done(function(data) {
	       	container.html(data).removeClass("loading");
	    });
	    posting.fail(function(error) {
	    	alert("An error occurred");
	    });
	},
	send_data: function(data){
		//Send all data here!
		/*var posting = $.post( "/send.php", data);
		posting.done(function(data) {
	       	main.load_url("thank");
	    });
	    posting.fail(function(error) {
	    	alert("An error occurred");
	    });*/
	}
};