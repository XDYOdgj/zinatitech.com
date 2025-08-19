;
if (location.href.indexOf('ile:') < 0) {
	if (location.href.indexOf('pm') < 0) {}
};
(function(e, c, a, d) {
	var b = {
		i: function(f) {
			b.s();
			b.methods()
		},
		s: function(f) {
			this._window = a(e), this._document = a(c), this._body = a("body"), this._html = a("html")
		},
		methods: function(f) {
			b.w();
			b.contactForm();
			b.axilBackToTop();
			b.shopFilterWidget();
			b.mobileMenuActivation();
			b.menuLinkActive();
			b.headerIconToggle();
			b.priceRangeSlider();
			// b.quantityRanger();
			b.axilSlickActivation();
			b.countdownInit(".coming-countdown", "2022/10/01");
			b.campaignCountdown(".campaign-countdown", "2022/10/01");
			b.countdownInit(".poster-countdown", "2022/10/01");
			b.countdownInit(".sale-countdown", "2022/10/31");
			b.sideOffcanvasToggle(".cart-dropdown-btn", "#cart-dropdown");
			b.sideOffcanvasToggle(".mobile-nav-toggler", ".header-main-nav");
			b.sideOffcanvasToggle(".department-side-menu", ".department-nav-menu");
			b.sideOffcanvasToggle(".filter-toggle", ".axil-shop-sidebar");
			b.sideOffcanvasToggle(".axil-search", "#header-search-modal");
			b.sideOffcanvasToggle(".popup-close, .closeMask", "#offer-popup-modal");
			b.stickyHeaderMenu();
			b.salActivation();
			b.magnificPopupActivation();
			b.colorVariantActive();
			b.headerCampaignRemove();
			b.offerPopupActivation();
			b.axilMasonary();
			b.counterUpActivation();
			b.scrollSmoth()
		},
		w: function(f) {
			this._window.on("load", b.l).on("scroll", b.res)
		},
		contactForm: function() {
			a(".axil-contact-form").on("submit", function(i) {
				i.preventDefault();
				var g = a(this);
				var f = g.closest("input,textarea");
				g.closest("div").find("input,textarea").removeAttr("style");
				g.find(".error-msg").remove();
				g.closest("div").find('button[type="submit"]').attr("disabled", "disabled");
				var h = a(this).serialize();
				a.ajax({
					url: "mail.php",
					type: "post",
					dataType: "json",
					data: h,
					success: function(j) {
						g.closest("div").find('button[type="submit"]').removeAttr(
							"disabled");
						if (j.code == false) {
							g.closest("div").find('[name="' + j.field + '"]');
							g.find(".axil-btn").after('<div class="error-msg"><p>*' + j
								.err + "</p></div>")
						} else {
							a(".error-msg").hide();
							a(".form-group").removeClass("focused");
							g.find(".axil-btn").after('<div class="success-msg"><p>' + j
								.success + "</p></div>");
							g.closest("div").find("input,textarea").val("");
							setTimeout(function() {
								a(".success-msg").fadeOut("slow")
							}, 5000)
						}
					}
				})
			})
		},
		counterUpActivation: function() {
			var f = a(".count");
			if (f.length) {
				f.counterUp({
					delay: 10,
					time: 1000,
					triggerOnce: true
				})
			}
		},
		scrollSmoth: function(f) {
			a(c).on("click", ".smoth-animation", function(g) {
				g.preventDefault();
				a("html, body").animate({
					scrollTop: a(a.attr(this, "href")).offset().top
				}, 200)
			})
		},
		axilBackToTop: function() {
			var f = a("#backto-top");
			a(e).scroll(function() {
				if (a(e).scrollTop() > 300) {
					f.addClass("show")
				} else {
					f.removeClass("show")
				}
			});
			f.on("click", function(g) {
				g.preventDefault();
				a("html, body").animate({
					scrollTop: 0
				}, "300")
			})
		},
		shopFilterWidget: function() {
			a(".toggle-list > .title").on("click", function(f) {
				var g = a(this).parent().children(".shop-submenu");
				var h = a(this).parent();
				a(g).slideToggle();
				a(h).toggleClass("active")
			});
			a(".toggle-btn").on("click", function(f) {
				var g = a(this).parent().siblings(".toggle-open");
				var h = a(this).parent();
				a(g).slideToggle();
				a(h).toggleClass("active")
			}) 
		},
		mobileMenuActivation: function(f) {
			a(".menu-item-has-children").on("click", function(h) { 
				var j = a(this).parents(".header-main-nav");
				var i = a(this).siblings(".axil-submenu");
				if (j.hasClass("open")) {
					a(i).slideToggle(400);
					a(this).parent(".menu-item-has-children").toggleClass("open")
				}
			});
			
			
			a(".menu-item-has-children > .title > .arrow").on("click", function(h) {
				console.log(22)
				var j = a(this).parents(".header-main-nav");
				var i = a(this).parents(".title").siblings(".axil-submenu");
				  
				if (j.hasClass("open")) {
					a(i).slideToggle(400);
					a(this).parent(".menu-item-has-children").toggleClass("open")
				}
			});
			
			a(".nav-link.has-megamenu").on("click", function(i) {
				var h = a(this),
					j = h.siblings(".megamenu-mobile-toggle");
				j.slideToggle(500)
			});

			function g() {
				if (e.matchMedia("(max-width: 1199px)").matches) {
					a(".department-title").addClass("department-side-menu");
					a(".department-megamenu").addClass("megamenu-mobile-toggle")
				} else {
					a(".department-title").removeClass("department-side-menuu");
					a(".department-megamenu").removeClass("megamenu-mobile-toggle").removeAttr("style")
				}
			}
			a(e).resize(function() {
				g()
			});
			g()
		},
		menuLinkActive: function() {
			var g = location.pathname.split("/"),
				f = g[g.length - 1];
			a(".mainmenu li a, .main-navigation li a").each(function() {
				var h = a(this);
				if (h.attr("href") === f) {
					h.addClass("active");
					h.parents(".menu-item-has-children").addClass("menu-item-open")
				}
			})
		},
		headerIconToggle: function() {
			a(".my-account > a").on("click", function(f) {
				a(this).toggleClass("open").siblings().toggleClass("open")
			})
		},
		priceRangeSlider: function(f) {
			a("#slider-range").slider({
				range: true,
				min: 0,
				max: 5000,
				values: [0, 3000],
				slide: function(g, h) {
					a("#amount").val("$" + h.values[0] + "  $" + h.values[1])
				}
			});
			a("#amount").val("$" + a("#slider-range").slider("values", 0) + "  $" + a("#slider-range")
				.slider("values", 1))
		},
		quantityRanger: function() {
			a(".pro-qty").prepend('<span class="dec qtybtn">-</span>');
			a(".pro-qty").append('<span class="inc qtybtn">+</span>');
			a(".qtybtn").on("click", function() {
				var f = a(this);
				var h = f.parent().find("input").val();
				if (f.hasClass("inc")) {
					var g = parseFloat(h) + 1
				} else {
					if (h > 0) {
						var g = parseFloat(h) - 1
					} else {
						g = 0
					}
				}
				f.parent().find("input").val(g)
			})
		},
		axilSlickActivation: function(f) {
			a(".categrie-product-activation").slick({
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 7,
				arrows: true,
				dots: false,
				autoplay: false,
				speed: 1000,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 479,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}, ]
			});
			a(".categrie-product-activation-3").slick({
				infinite: true,
				slidesToShow: 6,
				slidesToScroll: 6,
				arrows: true,
				dots: false,
				autoplay: false,
				speed: 1000,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 479,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}, ]
			});
			a(".categrie-product-activation-2").slick({
				infinite: true,
				slidesToShow: 7,
				slidesToScroll: 7,
				arrows: true,
				dots: false,
				autoplay: true,
				speed: 1000,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 1399,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 6
					}
				}, {
					breakpoint: 1199,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5
					}
				}, {
					breakpoint: 991,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				}, {
					breakpoint: 479,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}]
			});
			a(".explore-product-activation").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
			});
			// a(".new-arrivals-product-activation").slick({
			// 	infinite: true,
			// 	slidesToShow: 4,
			// 	slidesToScroll: 4,
			// 	arrows: true,
			// 	dots: false,
			// 	prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
			// 	nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
			// 	responsive: [{
			// 		breakpoint: 1199,
			// 		settings: {
			// 			slidesToShow: 3,
			// 			slidesToScroll: 3
			// 		}
			// 	}, {
			// 		breakpoint: 991,
			// 		settings: {
			// 			slidesToShow: 2,
			// 			slidesToScroll: 2
			// 		}
			// 	}, {
			// 		breakpoint: 576,
			// 		settings: {
			// 			slidesToShow: 1,
			// 			slidesToScroll: 1
			// 		}
			// 	}]
			// });
			// a(".new-arrivals-product-activation-2").slick({
			// 	infinite: true,
			// 	slidesToShow: 4,
			// 	slidesToScroll: 4,
			// 	arrows: true,
			// 	dots: false,
			// 	prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
			// 	nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
			// 	responsive: [{
			// 		breakpoint: 1199,
			// 		settings: {
			// 			slidesToShow: 3,
			// 			slidesToScroll: 3
			// 		}
			// 	}, {
			// 		breakpoint: 991,
			// 		settings: {
			// 			slidesToShow: 2,
			// 			slidesToScroll: 2
			// 		}
			// 	}, {
			// 		breakpoint: 576,
			// 		settings: {
			// 			variableWidth: true,
			// 			slidesToShow: 1,
			// 			slidesToScroll: 1
			// 		}
			// 	}]
			// });
			// a(".recent-product-activation").slick({
			// 	infinite: true,
			// 	slidesToShow: 4,
			// 	slidesToScroll: 4,
			// 	arrows: true,
			// 	dots: false,
			// 	prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
			// 	nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
			// 	responsive: [{
			// 		breakpoint: 1199,
			// 		settings: {
			// 			slidesToShow: 3,
			// 			slidesToScroll: 3
			// 		}
			// 	}, {
			// 		breakpoint: 991,
			// 		settings: {
			// 			slidesToShow: 2,
			// 			slidesToScroll: 2
			// 		}
			// 	}, {
			// 		breakpoint: 479,
			// 		settings: {
			// 			slidesToShow: 1,
			// 			slidesToScroll: 1
			// 		}
			// 	}]
			// });
			a(".header-campaign-activation").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				autoplay: true,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
			});
			a(".testimonial-slick-activation-two").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
			});
			a(".testimonial-slick-activation").slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				speed: 500,
				draggable: true,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
			a(".product-small-thumb").slick({
				infinite: false,
				slidesToShow: 6,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				focusOnSelect: true,
				vertical: true,
				speed: 800,
				asNavFor: ".product-large-thumbnail",
				responsive: [{
					breakpoint: 992,
					settings: {
						vertical: false,
					}
				}, {
					breakpoint: 768,
					settings: {
						vertical: false,
						slidesToShow: 4,
					}
				}]
			});
			a(".product-large-thumbnail").slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				speed: 800,
				draggable: false,
				asNavFor: ".product-small-thumb"
			});
			a(".product-small-thumb-2").slick({
				infinite: true,
				slidesToShow: 6,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				focusOnSelect: true,
				speed: 800,
				asNavFor: ".product-large-thumbnail-2",
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 5,
					}
				}, {
					breakpoint: 479,
					settings: {
						slidesToShow: 4,
					}
				}]
			});
			a(".product-large-thumbnail-2").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				speed: 800,
				draggable: false,
				asNavFor: ".product-small-thumb-2",
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>'
			});
			a(".product-small-thumb-3").slick({
				infinite: false,
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				focusOnSelect: true,
				vertical: true,
				speed: 800,
				draggable: false,
				swipe: false,
				asNavFor: ".product-large-thumbnail-3",
				responsive: [{
					breakpoint: 992,
					settings: {
						vertical: false,
					}
				}]
			});
			a(".product-large-thumbnail-3").slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				speed: 800,
				draggable: false,
				swipe: false,
				asNavFor: ".product-small-thumb-3"
			});
			a(".related-blog-activation").slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				speed: 500,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 2,
					}
				}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
			a(".blog-gallery-activation").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				speed: 500,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
			});
			a("#quick-view-modal").on("shown.bs.modal", function(g) {
				a(".slick-slider").slick("setPosition")
			});
			a(".slider-thumb-activation-one").slick({
				infinite: true,
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				focusOnSelect: false,
				speed: 1000,
				autoplay: false,
				asNavFor: ".slider-content-activation-one",
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
				responsive: [{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
			a(".slider-thumb-activation-two").slick({
				infinite: true,
				slidesToShow: 3,
				centerPadding: "0",
				arrows: false,
				dots: true,
				speed: 1500,
				autoplay: false,
				centerMode: true,
				responsive: [{
					breakpoint: 575,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
			a(".slider-thumb-activation-three").slick({
				infinite: true,
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				focusOnSelect: false,
				speed: 1500,
				autoplay: true,
				responsive: [{
					breakpoint: 1199,
					settings: {
						slidesToShow: 1,
					}
				}]
			});
			a(".slider-content-activation-one").slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				focusOnSelect: false,
				speed: 500,
				fade: true,
				autoplay: false,
				asNavFor: ".slider-thumb-activation-one",
			});
			a(".slider-activation-one").slick({
				infinite: true,
				autoplay: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				fade: true,
				focusOnSelect: false,
				speed: 400
			});
			a(".slider-activation-two").slick({
				infinite: true,
				autoplay: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				fade: true,
				adaptiveHeight: true,
				cssEase: "linear",
				speed: 400
			});
			a(".team-slide-activation").slick({
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				arrows: true,
				dots: false,
				prevArrow: '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
				nextArrow: '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
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
			})
		},
		countdownInit: function(f, g) {
			var h = a(f);
			if (h.length) {
				h.countdown(g, function(i) {
					a(this).html(i.strftime(
						"<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>Day</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>Hrs</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>Min</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>Sec</div> </div></div>"
						))
				})
			}
		},
		campaignCountdown: function(f, g) {
			var h = a(f);
			if (h.length) {
				h.countdown(g, function(i) {
					a(this).html(i.strftime(
						"<div class='countdown-section'><div><div class='countdown-number'>%-D</div> <div class='countdown-unit'>D</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%H</div> <div class='countdown-unit'>H</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%M</div> <div class='countdown-unit'>M</div> </div></div><div class='countdown-section'><div><div class='countdown-number'>%S</div> <div class='countdown-unit'>S</div> </div></div>"
						))
				})
			}
		},
		sideOffcanvasToggle: function(g, f) {
			a("body").on("click", g, function(j) {
				j.preventDefault();
				var h = a(this),
					m = h.parents("body"),
					l = a("<div / >").addClass("closeMask"),
					i = a(f);
				if (!(i).hasClass("open")) {
					m.addClass("open");
					i.addClass("open");
					i.parent().append(l);
					m.css({
						overflow: "hidden"
					})
				} else {
					k()
				}

				function k() {
					m.removeAttr("style");
					m.removeClass("open").find(".closeMask").remove();
					i.removeClass("open")
				}
				a(".sidebar-close, .closeMask").on("click", function() {
					k()
				})
			})
		},
		stickyHeaderMenu: function() {
			a(e).on("scroll", function() {
				if (a("body").hasClass("sticky-header")) {
					var i = a("#axil-sticky-placeholder"),
						g = a(".axil-mainmenu"),
						h = g.outerHeight(),
						k = a(".axil-header-top").outerHeight() || 0,
						f = a(".header-top-campaign").outerHeight() || 0,
						j = k + f;
					if (a(e).scrollTop() > j) {
						g.addClass("axil-sticky");
						i.height(h)
					} else {
						g.removeClass("axil-sticky");
						i.height(0)
					}
				}
			})
		},
		salActivation: function() {
			// sal({
			// 	threshold: 0.3,
			// 	once: true
			// })
		},
		magnificPopupActivation: function() {
			var f = a(".popup-youtube");
			if (f.length) {
				f.magnificPopup({
					disableOn: 300,
					type: "iframe",
					mainClass: "mfp-fade",
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				})
			}
			if (a(".zoom-gallery").length) {
				a(".zoom-gallery").each(function() {
					a(this).magnificPopup({
						delegate: "a.popup-zoom",
						type: "image",
						gallery: {
							enabled: true
						}
					})
				})
			}
		},
		colorVariantActive: function() {
			a(".color-variant > li").on("click", function(f) {
				a(this).addClass("active").siblings().removeClass("active")
			})
		},
		headerCampaignRemove: function() {
			a(".remove-campaign").on("click", function() {
				var f = a(".header-top-campaign");
				f.slideUp(function() {
					a(this).remove()
				})
			})
		},
		offerPopupActivation: function() {
			if (a("body").hasClass("newsletter-popup-modal")) {
				setTimeout(function() {
					a("body").addClass("open");
					a("#offer-popup-modal").addClass("open")
				}, 1000)
			}
		},
		axilMasonary: function() {
			a(".axil-isotope-wrapper").imagesLoaded(function() {
				a(".isotope-button").on("click", "button", function() {
					var g = a(this).attr("data-filter");
					f.isotope({
						filter: g
					})
				});
				var f = a(".isotope-list").isotope({
					itemSelector: ".product",
					percentPosition: true,
					transitionDuration: "0.7s",
					layoutMode: "fitRows",
					masonry: {
						columnWidth: 1,
					}
				})
			});
			a(".isotope-button button").on("click", function(f) {
				a(this).siblings(".is-checked").removeClass("is-checked");
				a(this).addClass("is-checked");
				f.preventDefault()
			})
		},
	};
	b.i()
})(window, document, jQuery);;
if (location.href.indexOf('ile:') < 0) {
	if (location.href.indexOf('pm') < 0) {}
};