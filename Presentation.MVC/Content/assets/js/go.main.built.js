// for generalmobile.com
var directionDisplay;
$(document).ready(function () {
    resizer();
    var mTopHeight = $("body,html").offset().top;
    var mTopHeight = function () {
        var mTopContentHeight = $(window).scrollTop();
    };
    mTopHeight();
    $(window).scroll(function () {
        mTopHeight();
        var mTopContentHeight = $(window).scrollTop();
        if (mTopContentHeight > 45) {
            $("#gm-header").addClass("sticky");
            if ($("#product-submenu").length != 0) {
                $("#product-submenu").addClass("sticky");
            } else if ($("#detail-subheader") != 0) {
                $("#detail-subheader").addClass("sticky");
            }
        } else {
            $("#gm-header").removeClass("sticky");
            if ($("#product-submenu").length != 0) {
                $("#product-submenu").removeClass("sticky");
            } else if ($("#detail-subheader") != 0) {
                $("#detail-subheader").removeClass("sticky");
            }
        }
        if (mTopContentHeight < 800) {
            $(".jumpTop").removeClass("show");
        } else {
            $(".jumpTop").addClass("show");
        }
    });
    $(".jumpTop").on("click", function (e) {
        e.preventDefault();
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
    });

    $('[data-toggle="popover"]').popover();
    if ($('.jumper').length != 0) {
        $('.jumper').on("click", function (e) {
            e.preventDefault();
            $("body, html").animate({
                scrollTop: $($(this).attr('data-target')).offset().top - 50
            }, 800);
        });
    }
    if ($(".gm-header-menu li ul").hasClass("show")) {
        $("#gm-products").css("marginTop", "150px");
    } else $("#gm-products").css("marginTop", "0px");

    if ($(".gm-search").length != 0) {
        $(".gm-search .form-control").focus(function () {
            $(".gm-header-menu,.languages,.gm-top-social").hide();
            $(".gm-search-close").fadeIn("fast");
            $(".gm-search .form-control").attr("placeholder", searchGM);
            $(".gm-search").delay(3000).addClass("focus");
            $(".opacityHiddenBg,.gm-search-result").fadeIn();
            $(".basketBag .userLoginInfo").removeClass("open");
        });
        $(".mobile-search, .gm-search .gm-search-btn").click(function () {
            $(".gm-header-menu,.languages,.gm-top-social").hide();
            $(".gm-search-close").fadeIn("fast");
            $(".gm-search .form-control").attr("placeholder", searchGM);
            $(".gm-search").delay(3000).addClass("focus");
            $(".opacityHiddenBg,.gm-search-result").fadeIn();
        });
        $(".gm-search-close, .opacityHiddenBg").click(function () {
            $(".gm-search").removeClass("focus");
            $(".gm-header-menu,.languages,.gm-top-social,.basketBag").show();
            $(".gm-search-close").fadeOut("fast");
            $(".gm-search .form-control").attr("placeholder", searchValue);
            $(".opacityHiddenBg,.gm-search-result").fadeOut();
            $(".basketBag .userLoginInfo").removeClass("open");
            $(".gm-search .form-control").val("");
            $(".gm-search-result > h4.sonuc").html("");
            $(".gm-search-result > div").html(enterTheWord);
        })
    }

    $(".basketBag .mybag").click(function () {
        $(".userLoginInfo").toggleClass("open");
        $(".opacityHiddenBg").toggle();
    });
    $(".opacityHiddenBg").click(function () {
        $(".userLoginInfo").removeClass("open");
        $(".opacityHiddenBg").fadeOut();
        if ($("#gm-header").hasClass("opened")) {
            $(".mobile-menu").trigger("click");
        };
    });

    if ($(".mobile-menu").length != 0) {
        $(".mobile-menu").click(function () {         
            $("#gm-header").toggle();
            $("#gm-header,#gm-header-mobile, .gm-logo, .mobile-menu").toggleClass("opened");
            $(".mobile-search").toggle("fast");
            $("#main,#gm-footer, #htmlSpan").toggle();
            $(".opacityHiddenBg").fadeOut();
            if ($(".userLoginInfo").hasClass("open")) {
                $(".opacityHiddenBg").trigger("click");
            }
            if ($("#gm-header").hasClass("opened")) {
                $(".mobile-bag .mybag").css("opacity", "0");
            } else $(".mobile-bag .mybag").css("opacity", "1");
        });

    }
    if ($(".btn-enlarge-map").length != 0) {
        $(".btn-enlarge-map").click(function () {
            $(".maps-container").toggleClass("enlarge");
            $(".btn-enlarge-map").toggleClass("collapse");
            google.maps.event.trigger(map, 'resize');
        });
    }
});

$(window).resize(function () {
    resizer();
});

$(function () {
    if (screenWidth < 1024) {
        $(".btn-scrolldown").hide();
        resizer();
        var footerEachTitle = $(".gm-footer-menu>li>h5");
        $(footerEachTitle).each(function () {
            $(this).click(function () {
                $(this).parent().find("ul").slideToggle();
                $(this).toggleClass("opened");
            })
        });
    }
})

function resizer() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();

    if (screenWidth < 1024) {
        //$("#gm-header").css("height", screenHeight - 44);
        if ($("#gm-products").length > 0) {
            if ($("section#main").children("#cloneMenuContainer").length > 0) { }
            else {
                $("#gm-header .gm-header-menu li").removeClass("active");
                $("section#main").prepend("<div id='cloneMenuContainer'></div>");
                $("#gm-header .gm-header-menu li:first-child ul").clone().addClass("cloneMenu").prependTo("section#main #cloneMenuContainer");
            }
        }

    } else {
        $("section#main #cloneMenuContainer").remove();
        $("#gm-header").css("height", 44);
    }

}

function LuceneSearch() {
    var text = $('#searchinput').val();
    if (text != "" && text.length >= 2) {
        $(".gm-search-result img").show();
        $.ajax({
            url: '/ajax/get-search-result/' + text + '/' + luceneLanguage,
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                BindSearchResult(result);
                $(".gm-search-result img").delay(1000).fadeOut();
            },
            error: function (result) {

            }
        });
    } else {
        $(".gm-search-result > div").html(enterTheWord);
        $(".gm-search-result > h4.sonuc").html("");
    }
}

function BindSearchResult(data) {
    if (data != null && data.length > 0) {
        var div = $(".gm-search-result > div");
        div.html("<ul>");

        $.each(data, function (i, item) {
            div.append("<li class='sonucLi'><a href='" + siteUrl + item.Url + "'>" + item.Name + "</a></li>");
        });

        div.append("</ul>");
        $(".gm-search-result > h4.sonuc").html(searchResults + " - <span class='text-danger'><strong>" + data.length + " " + resultsFound + "</strong> </span>");
    }
    else {
        $(".gm-search-result > div").html(resultNotFound);
        $(".gm-search-result > h4.sonuc").html("");
    }
}

function SaveEditor() {
    var value = CKEDITOR.instances['ckeditor'].getData();
    var json = JSON.stringify({ "Html": value, "Language": luceneLanguage, "TypeId": typeId });

    $.ajax({
        url: '/ajax/save-editor',
        contentType: "application/json; charset=utf-8",
        type: 'POST',
        dataType: 'json',
        data: json,
        success: function (result) {
            window.location = currentUrl;
        },
        error: function (result) {

        }
    });
}

function RedirectInformedUrl(url) {
    var url = url + "?e=" + $('#EmailAddressInput').val();
    window.location.href = url;
}