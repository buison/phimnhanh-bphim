var window_width = $(window).width();
var wrapper_w = $("#w_w_t").width();
var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
function show_main_menu_sub() {
    //hideSearch();
    if ($('body').hasClass('show-left-menu-sub') === false) {
        $('body').addClass('show-left-menu-sub');
        //w_h = $(window).height();
        //$('.nav-side-btn .menu').height(w_h-52);


    }
    else hide_main_menu_sub();
}
function hide_main_menu() {
    $('body').removeClass('show-left-menu');
    hide_main_menu_sub();
}
function hide_main_menu_sub() {
    $('body').removeClass('show-left-menu-sub');
    $('#left-menu > ul > li').removeClass('show');
}
function resize_update() {
    w_h = $(window).height();
    w_w = $(window).width();
    $('#global').width(w_w);
    if (w_w < 601) {


    }
}
function resize_menu(elm) {

    function update_menu_size(obj) {
        function calElm(obj_w, m_w, w, i, a_r, d) {
            if (obj_w + m_w > w) {

                i_p = i;
                a_r.children('li:eq(' + i_p.index() + ')').addClass('hide');
                d.children('li:eq(' + i_p.index() + ')').addClass('show');
                /*
                 if(i.hasClass('fix')=== true)
                 {
                 i_p = i.prev(':not(.fix.c-hide)');
                 obj_w= obj_w-i_p.outerWidth();
                 alert(i_p.text()); a_r.children('li:eq('+i_p.index()+')').addClass('hide');
                 i_p.addClass('c-hide'); d.children('li:eq('+i_p.index()+')').addClass('show');
                 if(obj_w+i.outerWidth()+m_w > w) {
                 alert(obj_w+i.outerWidth()+m_w+'__'+w+'__'+i.text()+'--'+i_p.text());
                 calElm(obj_w+i.outerWidth(),m_w,w,zi,a_r,d);
                 }

                 }
                 else
                 {
                 i_p = i;    a_r.children('li:eq('+i_p.index()+')').addClass('hide');
                 d.children('li:eq('+i_p.index()+')').addClass('show');
                 }*/
            }
            else {
                a_r.children('li:eq(' + i.index() + ')').removeClass('hide');
                d.children('li:eq(' + i.index() + ')').removeClass('show');
            }
        }

        a = obj;
        a_id = a.attr('id');
        a_r = $('#' + a_id);
        if (a_id == undefined) return;
        b_id = a_id.replace('_clone', '');
        if (b_id == "") return;
        d_id = b_id + '_more';
        d = $('#' + d_id);
        if (d_id == "") return;
        b = $('#' + b_id);
        data_target = b.attr('data-width-target');
        if (data_target != undefined) w_obj = $(data_target);
        else {
            w_obj = b.parent();

        }
        w = w_obj.outerWidth();
        w_b = b.outerWidth();
        m = a.find('li.more');
        d.css({'width': w});
        m_w = m.outerWidth();
        m.hide();
        if (w_b > w) {
            m.show();
            m.addClass('enabled');
            var obj_w = 0;
            var obj_w_2 = 0;
            var n = 0;
            b.children().each(function () {
                i = $(this);
                obj_w_ = obj_w;
                obj_w = obj_w + i.outerWidth();
                //calElm(obj_w,m_w,w,i,a_r,d)

                if (obj_w + m_w > w) {

                    if (obj_w_2 == 0) obj_w_2 = w - obj_w_ - m_w;
                    a_r.children('li:eq(' + i.index() + ')').addClass('hide');
                    d.children('li:eq(' + i.index() + ')').addClass('show');

                }
                else {

                    a_r.children('li:eq(' + i.index() + ')').removeClass('hide');
                    d.children('li:eq(' + i.index() + ')').removeClass('show');
                    n++;
                }
            })
            if (obj_w_2 > 0) {

                mg = (obj_w_2) / (n);
                a_r.children('li:not(.more)').css({'margin-right': mg})
            }
            else a_r.children('li:not(.more)').css({'margin-right': 0})
        }
        else m.removeClass('enabled');
    }

    if ($(window).width() > 319) {
        $(elm).each(function () {
            a = $(this);
            a_id = a.attr('id');
            if (a_id == undefined) return;
            b = $('#' + a_id + '_clone');
            if (b.length == 0) {
                b = a.clone().removeClass('menu-resize').addClass('menu-resize-clone').attr('id', a_id + '_clone').insertAfter(a);
                $c = $('<li class="more"><button>&raquo;</button></li>');
                $c.appendTo(b);
                d = a.clone().removeClass('menu-resize');
                d.attr('id', a_id + '_more').appendTo($c);
                a.height(0);
            }
            update_menu_size(b);
        })
    }
}


$.ajaxSetup({headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});

$.fn.replaceRedirectLink = function (url) {
    var href = this.attr('href');
    var indexOf = href.indexOf('?');
    if (indexOf !== -1) {
        href = href.substring(0, indexOf);
    }

    var redirect = '';
    if (url) {
        redirect = '?redirect=' + encodeURIComponent(url);
    }

    this.attr('href', href + redirect);
};

var $wrapper_enlarge = $("<span class='enlarge-area'></span>");
function login(url, force) {
    if (force) {
        $('#box_login .close-popup').hide();
    } else {
        $('#box_login .close-popup').show();
    }

    popup('login');

    $('#frm-loginForm').attr('data-redirect-url', url);

    $('.fb.acc-cn, .gp.acc-cn').each(function () {
        $(this).replaceRedirectLink(url);
    })
}

function register() {
    popup('register', './demo/register.html');
}
function enlarge_img_update(a, a_w, w_w) {
    if (a_w > w_w) {

        if (a.hasClass('enlarge') === false) {
            a.addClass('enlarge');
            a.wrap($wrapper_enlarge);
            a.after('<span class="tip show">Click để xem hình ở cỡ lớn hơn</span>');
            a.after('<span class="tip hide">Click để thu nhỏ hình</span>');
        }
    }
    else {
        if (a.hasClass('enlarge') === true) {
            a.removeClass('enlarge');

            a.parent().find('span.tip').remove();
            a.unwrap();
        }


    }
}
function enlarge_img() {
    w_w = $('.entry').width();

    $('.entry img').each(function (index, element) {
        var a = $(this);
        a_w = a.attr('data-width');

        if (a_w === undefined) {

            $("<img/>").attr("src", a.attr("src")).load(function () {
                a_w = this.width;

                a.attr('data-width', a_w);
                enlarge_img_update(a, a_w, w_w)
            });
        }
        else enlarge_img_update(a, a_w, w_w);
    })

}
function window_resize() {
    enlarge_img();
    resize_menu();
    wrapper_w = $("#w_w_t").width();
}
function tab(a, b) {
    c = jQuery("#tab_" + a + "_" + b);
    d = jQuery("#tab_ct_" + a + "_" + b);
    jQuery("#" + a + " .tabs li, #" + a + " .tab_ct").removeClass("c");
    c.addClass('c');
    d.addClass('c');
    a = $('#collect_' + b);
    if (a.hasClass('slick-initialized') === false) $('#collect_' + b).slick(slide_movie_setting);
}
var pdl = 130 + 130;


function show_bn_l_b(a) {
    $('#bn_bottom_fixed_' + a).addClass('show')
    $('#bn_bottom_fixed_' + a + '_btn').html('Tắt quảng cáo')
}
function hide_bn_l_b(a) {
    $('#bn_bottom_fixed_' + a).removeClass('show');
    $('#bn_bottom_fixed_' + a + '_btn').html('Hiện quảng cáo')
}
function toogle_bn_l_b(a) {
    if ($('#bn_bottom_fixed_' + a).hasClass('show') === true) {
        hide_bn_l_b(a)
    }
    else {
        show_bn_l_b(a)
    }
}
function gotop() {
    $.scrollTo(0, 400);
}
function hide_menu() {
    $('.top-menu > ul > li, #menu-more').removeClass('show');
    $('body').removeClass('show-menu');
}
function show_menu() {
    hide_search();
    //$('body').addClass('show-menu');

    $('#top-menu-area').click(function (event) {
        event.stopPropagation();
        $('body, #menu-ovl').click(function (event) {
            hide_menu();
        });
    });

}
function hide_menu_mobile() {
    $('body').removeClass('show-menu-mobile');
    $('button.menu-mobile-button').removeClass('active')
}
function show_menu_mobile() {
    hide_search();
    $('body').addClass('show-menu-mobile');
    var top_m = $('#nav').outerHeight();
    var top_m_o = $('#nav').offset().top;
    var left_m_o = $('#nav').offset().left;
    $('#menu-mobile-ct').css({'top': top_m_o + top_m + 'px', 'left': left_m_o + 'px', 'max-width': $('#nav').width()})

    $('button.menu-mobile-button').addClass('active')

}
function show_search() {
    hide_menu();
    hide_menu_mobile();
    var s_a = $('#search');
    if (s_a.hasClass('show-input') === true) {
        hide_search()

    }
    else {
        s_a.addClass('show-input');
        $('#search-input').focus();
        $('#search-ovl').addClass('show').click(function () {
            hide_search()
        });
        $('body').addClass('show-search');
    }
}
function hide_search() {
    var s_a = $('#search');
    s_a.removeClass('show-input');
    $('#search-ovl').removeClass('show');
    $('#search-input').focusout();
    $('body').removeClass('show-search');
}

function download(id, source) {
    popup('download', '/download-verify/' + id, false, '', {source: source}, '')
}
//function getDownloadList(id)
//{
//    popup('download','/demo/download-list.html',false,'','','')
//}
function getDownload(id) {
    a = $('#download_eps_' + id + ' button.button-get-download');
    b = $('#download_eps_' + id);
    $c = $('<p class="error">Lỗi kết nối. Xin hãy thử lại.</p>');
    $('#download_eps_' + id + ' p.error').remove();
    if (a.hasClass('loading') === false) {
        a.text('Đang lấy link...');
        a.addClass('loading');
        $.ajax({
            url: '/download/' + id,
            type: 'POST',
            data: {id: id, '_token': $('meta[name="csrf-token"]').attr("content")},
            dataType: "json",
            cache: false,
            success: function (data) {
                getLinkDownload(0, data, a, b)
            },
            error: function () {
                a.text('Lấy link download');
                a.removeClass('loading');
                b.append($c)
            }
        })
    }
}

function getLinkDownload(i, data, a, b) {
    if (i < data.length) {
        $.ajax({
            url: data[i],
            type: 'get',
            dataType: 'json',
            cache: true,
            success: function (response) {
                if (response != "") {
                    if (response.data.sources.length > 0) {
                        html = '<ul class="download-links">';
                        $.each(response.data.sources, function (key, item) {
                            html += ' <li>' + item.label + '<a class="button button-sm" href="' + item.src + '" download="' + item.label + '">Download</a></li>'
                        });
                        html += '</ul>';
                        a.hide();
                        b.append(html);
                    }
                    else {
                        if (i < data.length - 1) getLinkDownload(i + 1, data, a, b);
                        else
                            b.html("<span>Không thể lấy được link, xin thử lại sau.</span>")
                    }
                }
                else {
                    if (i < data.length - 1) getLinkDownload(i + 1, data, a, b);
                    else
                        b.html("<span>Không thể lấy được link, xin thử lại sau.</span>")
                }

            },
            error: function () {
                if (i < data.length - 1) getLinkDownload(i + 1, data, a, b);
                else
                    b.html("<span>Không thể lấy được link, xin thử lại sau.</span>")
            }

        })
    }
};
function show_popup(box) {

}
function hide_popup() {
    $('body').removeClass('popup');
    $('#popup .box-container').hide();
}
function load_ad(name, content, time) {
    function _time() {
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            }
        }
        return Math.floor(Date.now() / 1000);
    }

    if (!time) time = 60 * 3;
    ad_cookie = "ad_" + name;
    p_a_t = $.cookie(ad_cookie);
    _now = _time();
    if (!p_a_t) {
        $.cookie(ad_cookie, _now, {expires: 30, path: '/'});
        p_a_t = 0;
    }
    if ($('#temp .' + ad_cookie).length > 0) {
        $('#temp .' + ad_cookie).remove();

    }
    if (_now - time >= p_a_t) {
        $('#temp').append('<div class="' + ad_cookie + '">' + content + '</div>');
        $.cookie(ad_cookie, _now);
    }
}
function popup_ad(content, time_w) {
    if (!time_w) time_w = 60 * 3;
    time_w = time_w;
    p_a_t = $.cookie("popupadstime");
    function _time() {
        if (!Date.now) {
            Date.now = function () {
                return new Date().getTime();
            }
        }
        return Math.floor(Date.now() / 1000);
    }

    _now = _time();
    if (!p_a_t) {
        $.cookie("popupadstime", _now, {expires: 365, path: '/'});
        p_a_t = 0;
    }
    if ($("#popup .box-container.box_qc").length > 0) {
        $("#popup .box-container.box_qc").remove();
    }
    $('#popup').append('<div class="box-container box_qc" role="dialog" id="box_ưc">' + content + '<div class="close-popup"><button onclick="hide_popup()"><i class="fa fa-times"></i></button></div></div>');
    if (_now - time_w >= p_a_t) {
        popup('qc');
        $.cookie("popupadstime", _now);
    }
}
function popup(a, url, cache, method, data, cl) {
    if (!method) method = 'GET';
    if (($('#popup .box-container').hasClass('box_' + a) === false || ($('#popup .box-container').hasClass('box_' + a) === true && cache === false)) && url) {
        $('#popup .box-container').hide();
        //$('#bc_'+id).addClass('loading');
        $.ajax({
            url: url,
            type: method,
            data: data,
            cache: false,
            success: function (html) {
                $('body').addClass('popup');

                //$('#bc_'+id).removeClass('loading');


                $('#popup .box-container.box_' + a).remove();
                $('#popup').append('<div class="box-container box_' + a + ' ' + cl + '" role="dialog" id="box_' + a + '">' + html + '</div>');
                $('#popup').scrollTo(0, 0);

            }
        });

    }
    else {

        $('body').addClass('popup');

        $('#popup .box-container').hide();
        $('#popup .box-container.box_' + a).show();
        $('#popup').scrollTo(0, 0);

    }
}
jQuery(function ($) {
    $(document).on('click', 'a.no-change', function (event) {
        event.stopPropagation();
        event.preventDefault()

    });
    $wrapper_enlarge.click(function () {
        w_w = $(window).width();
        a = $(this);
        if (a.hasClass('enlarged') === true) {
            a.removeClass('enlarged');
            a.css({'max-width': 'none', 'margin-left': 0, 'margin-right': 0})
        }
        else {

            o_l = a.offset().left;
            o_r = w_w - o_l - a.width();
            a.addClass('enlarged');
            a.css({'max-width': w_w + 'px', 'margin-left': -o_l + 'px', 'margin-right': -o_r + 'px'})
        }
    })

    $('#search-button').click(function () {
        show_search()
    });
    setTimeout(function () {
        hide_bn_l_b('left')
    }, 5 * 60 * 1000);
    setTimeout(function () {
        hide_bn_l_b('right')
    }, 5 * 60 * 1000);
    //$('#bn_bottom_fixed_right .content').click(function(){hide_bn_l_b('right')});
    //$('#bn_bottom_fixed_left .content').click(function(){hide_bn_l_b('left')});
    var scr_t = $(window).scrollTop();
    if (scr_t > 74) $('#logo7').css('margin-right', 0)
    else $('#logo7').css('margin-right', -32);


    var iScrollPos = 0;
    var menu_pos = 0;
    $(window).scroll(function () {


        //direction

        var iCurScrollPos = $(this).scrollTop();

        if (iCurScrollPos > iScrollPos || iCurScrollPos < 91) {
            //$('#menu-fixed-clone').removeClass('show');

        } else {
            //if(iCurScrollPos>90)$('#menu-fixed-clone').addClass('show');
        }
        iScrollPos = iCurScrollPos;
        //--- direction
        var scr_t = $(window).scrollTop();
        if (scr_t > 74) $('#logo7').css('margin-right', 0)
        else $('#logo7').css('margin-right', -32);
    });
    $(".list_m:not(.slick-slider) img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 200,

    });
    $(".list_m.slick-slider img.lazy").each(function () {
        a = $(this);
        a.attr('src', a.attr('data-original'));
    });


    $(document).on('click', 'button.menu-mobile-button', function (event) {

        a = $("body");
        if (a.hasClass('show-menu-mobile') === false) {
            show_menu_mobile()
        }
        else {
            hide_menu_mobile()
        }

    });
    window_resize();
    $(window).resize(function (e) {

        hide_menu_mobile();
        hide_menu();
        window_resize();
        //hide_search()
    });

    $("#left-menu .close").click(function () {
        hide_tinymenu()
    });
    $("#Fancy-Free").css('height', $(window).height());

    $("#search-input").keyup(function () {
        var s_v = $(this).val();
        if (s_v != "")$('#search .input .buttons').show(); else $('#search .input .buttons').hide()
    });

    $(document).on('click', '.download-button .button,.it .download', function () {
        $(".download-button").toggleClass('open');
        $(".it").toggleClass('open');
    })
    // $(document).on("focusout", ".download-button,.it .download", function () {
    //     $(".download-button").removeClass('open');
    //     $(".it").removeClass('open');
    // });
    $("body").click(function (e) {
        if (e.target.className != "bt_xemphim button")
            $(".download-button").removeClass('open');
        if (e.target.className != "download")
            $(".it").removeClass('open');
    })
});

function alignLeftRightBanners() {
    var mainElement;

    if ($('#w_w_t').width())
        mainElement = $('#w_w_t');
    else mainElement = $(window);

    var mainWidth = $(mainElement).outerWidth();
    var leftBarWidth = $('#floatleft').width();

    $('#floatleft').css({'left': $(mainElement).position().left - leftBarWidth - 12, 'z-index': 4});
    $('#floatright').css({'left': $(mainElement).position().left + mainWidth + 12, 'z-index': 4});
}
function showSearch() {
    hide_main_menu()
    $('body').addClass('show-search');
    $("#header .r-header").css({'margin-right': -$("#header .r-header").outerWidth()});
    $("#header .l-header").css({'margin-left': -$("#header .l-header").outerWidth()});
    $('#search-ovl').click(function () {
        hideSearch();
    });
}
function toggleSearch() {
    if ($('body').hasClass('show-search') === true) hideSearch();
    else showSearch();
}
function hideSearch() {
    $('body').removeClass('show-search');
    $("#header .r-header").css({'margin-right': 0});
    $("#header .l-header").css({'margin-left': 0});
    $('#appendedInputButton').val($('#appendedInputButton').attr('data-old-value'));
    $('#search-input').removeClass('searchable');
    if ($('#appendedInputButton').val() == "") $('#appendedInputButton').closest('form').removeClass('c');
}
function alignUserBox() {
    $("#user").mouseover(function () {
        $('.tff_menu_content').show();
    }).mouseleave(function () {
        $('.tff_menu_content').hide();
    });

    $('.tff_menu_content').mouseover(function () {
        $('.tff_menu_content').show();
    }).mouseleave(function () {
        $('.tff_menu_content').hide();
    });
}
$(function () {
    $('#body').css('z-index', '0');
    alignUserBox();
    alignLeftRightBanners();
    $(document).on('submit', '[name="download-verify-form"]', function (e) {
        e.preventDefault();
        var $form = $(this);
        $form.prev().hide();
        $.ajax({
            url: $form.attr('action'),
            data: {
                'g-recaptcha-response': grecaptcha.getResponse(),
                '_token': $form.find('[name="_token"]').val()
            },
            type: 'POST',
            success: function (response) {
                $form.replaceWith(response);
            },
            error: function (response) {
                $form.prev().show();
            }
        });

        return false;
    });

    $(window).resize(function () {
        alignLeftRightBanners();
    });
    $('#nav').css('overflow', 'visible');
    resize_menu('.menu-resize');
    resize_update();
    $(window).resize(function () {
        a = $(this).width();
        if (a != window_width) {
            resize_update();
            waitForFinalEvent(function () {
                resize_menu('.menu-resize');
            }, 1000, "some unique string");
            //if ($(this).width() > 719) hideSearch();
            window_width = a;
            //dot.trigger("destroy");
            //dot.dotdotdot();
        }
    });
    $(document).on('mouseenter', '.menu-nav li', function (event) {
        a = $(event.currentTarget);
        //$('.menu-nav li').not(a).removeClass('show-child');


        b = a.children('ul');
        t_w = $("#nav").width();
        b.css('width', t_w);

        b_w = b.outerWidth();
        a_w = a.outerWidth();
        c = a.offset().left + b_w - $("#nav").offset().left;
        t = a.parent();


        if (c > t_w) subt = t_w - c;
        else subt = 0;
        //if(b_w > t_w) subt2 = b_w-t_w;
        //else subt2 = 0;

        b.css('margin-left', subt);

        a.addClass('show-child');
    })
    $(document).on('mouseleave', '.menu-nav li', function (event) {
        a = $(event.currentTarget);
        a.removeClass('show-child');
    })
    // $('.menu-nav li').has('ul').each(function (index) {
    //
    //     var a = $(this);
    //     w_w = $(window).width();
    //     a.mouseover(function () {
    //         $('.menu-nav li').removeClass('show-child');
    //
    //
    //         b = a.children('ul');
    //         b.css('max-width',w_w)
    //         b_w = b.outerWidth();
    //         a_w = a.outerWidth()
    //         c = a.offset().left + b_w;
    //         t = a.parent();
    //         t_w = t.width();
    //
    //         if (c > t_w) subt = -b_w + a_w;
    //         else subt = 0;
    //         //if(b_w > t_w) subt2 = b_w-t_w;
    //         //else subt2 = 0;
    //
    //         b.css('margin-left', subt);
    //
    //         a.addClass('show-child');
    //
    //     }).mouseleave(function () {
    //         a.removeClass('show-child');
    //
    //     })
    //
    // });
    $('.tff_menu').mouseenter(function () {
        a = $(this);
        var dataMenu = a.attr('data-menu');

        $('.tff_menu').removeClass('show');
        if (a.children('.tff_menu_content').length > 0) {
            a.addClass('show');
        }
        if (a.hasClass('align-right') === false) {
            if (a.children('.tff_menu_content').length > 0) {
                wdW = $(window).width();
                aC = a.children('.tff_menu_content');
                mH = aC.outerHeight();
                mOt = a.offset().top;
                mW = a.outerWidth();
                mOl = a.offset().left;


                msOt = mOt + mH;

                msW = aC.outerWidth();
                msOl = (mW - msW) / 2;

                if (mOl + msOl + msW > wdW + 10) msOl = msOl - (mOl + msOl + msW - wdW + 10)
                aC.css({'left': msOl});
                //alert(mOl+mW/2+msW/2-wdW)
                /*

                 if(mOl+mW/2+msW/2 > wdW) msOl = msOl-(mOl+msW/2-wdW);
                 if(-msOl >= mOl) {
                 b.css('width',wdW);
                 msOl = -mOl;
                 }
                 else b.css('width',900);

                 msOl = -mOl;
                 b.css({'left':msOl});


                 a.addClass('show');*/
            }
        }
    }).mouseleave(function () {
        a = $(this);

        a.removeClass('show');
    });
    $('#search-input label.show-input-search.mobile').click(function () {
        toggleSearch();
        $('.search-input').trigger('keyup')
    });
    $('#search-input button.close').click(function () {
        hideSearch();
        $('.search-input').trigger('keyup');
    });
    $('#menu-ovl').click(function () {
        hide_main_menu();
    });
    $('.search-input').keyup(function () {
        a = $(this);
        if (a.val() == '') a.parents('form').removeClass('c');
        else {
            a.closest('form').addClass('c');
            a.closest('form').find('button.clear').click(function () {
                a.val('');
                a.trigger('keyup');
                a.focus()
            })
        }
    });
});
