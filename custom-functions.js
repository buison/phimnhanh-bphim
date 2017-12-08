$(function () {
    $.ajaxSetup({cache: false});

    $(document).ready(function () {
        var auto_popup = $('#auto_popup').val();
        if (auto_popup == '1') {
            $('#btn-login-home').trigger('click');
        }
        ;

        var $userBox = $('#userBox');
        $.ajax({
            url: $userBox.data('url'),
            data: {url: $userBox.attr('data-current')},
            success: function (data) {
                // data = $.parseJSON(data);
                $userBox.html(data.html);
                $("#userBoxMobile").html(data.mobile);
                $('#commentContainer').commentBox();
            }
        });

    });

    $('#frm-loginForm').on('submit', function (e) {
        var $form = $(this);
        e.preventDefault();
        $("#preloader").css('display', 'block');
        document.getElementById("btn-login").disabled = true;
        $('#btn-login').css({
            'opacity': '0.4',
            'background-image': 'url(http://www.broadwaybalancesamerica.com/images/ajax-loader.gif)'
        });
        var email = $('#frm-loginForm-email').val();
        var password = $('#frm-loginForm-password').val();
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            var originalSuccess = options.success;
            if (options.type.toLowerCase() === "post") {
                // initialize `data` to empty string if it does not exist
                options.data = options.data || "";
                // add leading ampersand if `data` is non-empty
                options.data += options.data ? "&" : "";
                // add _token entry
                options.data += "_token=" + csrf_token;
            }
        });

        var url = $('#frm-loginForm').attr('action');
        $.ajax({
            url: url,
            data: {
                'email': email,
                'password': password
            },
            type: 'POST',
            success: function (response) {
                $("#preloader").css('display', 'none');
                document.getElementById("btn-login").disabled = false;
                $('#btn-login').css('opacity', '1');
                if (response.success == 1) {
                    var redirectUrl = $form.attr('data-redirect-url');
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        window.location.reload();
                    }
                } else {
                    var content = $("#login-alert");
                    content.removeClass('hide');
                    content.text(response.message);
                }
            },
            error: function (response) {
                $("#preloader").css('display', 'none');
                document.getElementById("btn-login").disabled = false;
                $('#btn-login').css('opacity', '1');
            }
        });
    });

    /**
     * Jason <pmhai90@gmail.com>
     * Ajax Register function
     */
    $("#box_register").on('submit', function (e) {
        e.preventDefault();
        $("#preloader").css('display', 'block');
        var url = $('#frm-registerForm').attr('action');
        document.getElementById("btn-register").disabled = true;
        $('#btn-register').css('opacity', '0.4');
        var registerFrm = $('#frm-registerForm').serialize();
        if (registerValidate() == true) {
            $.ajax({
                url: url,
                data: registerFrm,
                type: 'POST',
                success: function (response) {
                    $("#preloader").css('display', 'none');
                    document.getElementById("btn-register").disabled = false;
                    $('#btn-register').css('opacity', '1');
                    if (response.success == 1) {
                        $('#box_register').find('.modal-content').addClass('hide');
                        $('#register-success-msg').removeClass('hide');
                        // $('#register-success-msg').text(response.message);
                        $('#register-success-msg').css('display', 'block');
                        /*window.location.reload();*/
                    } else {
                        var content = $('#register-alert');
                        content.removeClass('hide');
                        content.text(response.message);
                    }
                },
                error: function (response) {
                    document.getElementById("btn-register").disabled = false;
                    $('#btn-register').css('opacity', '1');
                    $("#preloader").css('display', 'none');
                }
            });
        } else {
            $("#preloader").css('display', 'none');
            document.getElementById("btn-register").disabled = false;
            $('#btn-register').css('opacity', '1');
            var content = $('#register-alert');
            content.removeClass('hide');
            content.text('Password phải trùng nhau');
        }
    });

    /**
     * forgot password function
     */
    $('#frm-forgot-passwordForm').on('submit', function (e) {
        e.preventDefault();
        $("#preloader").css('display', 'block');
        document.getElementById("btn-forgot-password").disabled = true;
        $('#btn-forgot-password').css('opacity', '0.4');
        var email = $('#frm-forgot-passwordForm-email').val();
        var csrf_token = $('meta[name="csrf-token"]').attr('content');
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            var originalSuccess = options.success;
            if (options.type.toLowerCase() === "post") {
                // initialize `data` to empty string if it does not exist
                options.data = options.data || "";
                // add leading ampersand if `data` is non-empty
                options.data += options.data ? "&" : "";
                // add _token entry
                options.data += "_token=" + csrf_token;
            }
        });

        var url = $('#frm-forgot-passwordForm').attr('action');
        var loginUrl = $('#login-url').val() + '/?login=1';
        $.ajax({
            url: url,
            data: {
                'email': email
            },
            type: 'POST',
            success: function (response) {
                $("#preloader").css('display', 'none');
                document.getElementById("btn-forgot-password").disabled = false;
                $('#btn-forgot-password').css('opacity', '1');
                if (response.success == 1) {
                    $('#box_forgot_password').find('.modal-content').addClass('hide');
                    $('#forgotpassword-success-msg').removeClass('hide');
                    $('#forgotpassword-success-msg').css('display', 'block');
                    window.location.href = loginUrl;
                } else {
                    var content = $('#forgotpassword-alert');
                    content.removeClass('hide');
                    content.text(response.message);
                }
            },
            error: function (response) {
                $("#preloader").css('display', 'none');
                document.getElementById("btn-forgot-password").disabled = false;
                $('#btn-forgot-password').css('opacity', '1');
            }
        });
    });

    $.fn.appendComment = function (comment) {
        this.append('<li class="comment-li">' + comment + '</li>');
    };

    $.fn.prependComment = function (comment) {
        this.prepend('<li class="comment-li">' + comment + '</li>');
    };

    $.fn.commentBox = function () {
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        this.each(function () {
            // main plugin elements
            var $container = $(this);
            var $list = $container.children('.comments-list').first();
            var $loadMoreButton = $container.find('.comment-load-more');
            var $commentForm = $('#frm-comments');

            // main plugin variables
            var commentCount = 0;
            var commentRootCount = 0;
            var userId = parseInt($container.attr('data-user-id'));
            var isAdmin = parseInt($container.attr('data-is-admin'));
            var url = $container.attr('data-url');
            var modelClass = $container.attr('data-model-class');
            var modelId = $container.attr('data-model-id');
            var lastId = 0;
            var hash = makeid();

            // define plugin methods
            var $methods = {};

            $methods.onChangedCommentCount = function () {
                $container.find('.comment-count').text(commentCount);
                if ($methods.getCurrentCommentCount() < commentRootCount) {
                    $loadMoreButton.show();
                } else {
                    $loadMoreButton.hide();
                }
            };

            $methods.getCurrentCommentCount = function () {
                return $list.children().length;
            };

            $methods.prepareComment = function (data) {
                var $html = $('<div>' + data.html + '</div>');
                $methods.updateCommentHtml($html, data);

                return $html[0].outerHTML;
            }

            $methods.updateCommentHtml = function ($html, data) {
                // $html.find('.comment-voting .upvotes').html(data.likes.length);
                $html.html(data.html);
                //Global user object get from user-box
                if (user && "id" in user) {
                    userId = user.id;
                }
                if (!userId) {
                    $html.find('.upvote.dislike').remove();
                    $html.find('.upvote.like').remove();
                    $html.find('.comment-report-spam').remove();
                    $html.find('.reply-comment').remove();
                } else {
                    $html.find('.comment-liked').remove();
                    if (data.likes.indexOf(userId) === -1) {
                        $html.find('.upvote.dislike').hide();
                        $html.find('.upvote.like').show();
                    } else {
                        $html.find('.upvote.like').hide();
                        $html.find('.upvote.dislike').show();
                    }

                    //If user is who update commment
                    if (data.user_id == userId && data.action == "comment.updated") {
                        $(".reply-form").hide();
                        $(".reply-form #replyComment").val("");
                    }
                }
            }

            $methods.load = function (callback) {
                $.ajax({
                    url: url,
                    data: {class: modelClass, id: modelId, from: lastId},
                    success: function (_response) {
                        commentCount = _response.count;
                        commentRootCount = _response.root_count;
                        lastId = _response.last_id;
                        $list.append(_response.comments);

                        $methods.onChangedCommentCount();

                        callback && callback();
                    },
                    error: function () {
                        callback && callback();
                    }
                })
            };

            $methods.addComment = function (url, data, success, error) {
                $.ajax({
                    url: url,
                    data: data,
                    type: 'POST',
                    success: function (response) {
                        // $("#preloader").css('display', 'none');
                        success && success(response);
                        $('.comment-count').each(function () {
                            $(this).html(parseInt($(this).html()) + 1);
                        });
                    },
                    error: function () {
                        // $("#preloader").css('display', 'none');
                        alert("Không thể gửi được comment, xin hãy thử lại.");
                        error && error();
                    }
                });

            };

            $methods.addReply = function (url, data, success, error) {
                $.ajax({
                    url: url,
                    data: data,
                    type: 'POST',
                    success: function (response) {
                        // $("#preloader").css('display', 'none');
                        success && success(response);
                        $('.comment-count').each(function () {
                            $(this).html(parseInt($(this).html()) + 1);
                        });
                    },
                    error: function () {
                        // $("#preloader").css('display', 'none');
                        error && error();
                    }
                });
            };

            $methods.containsUrl = function (text) {
                return text.indexOf('http://') !== -1 || text.indexOf('https://') !== -1;
            }

            //check cookie comment post
            if ($.cookie('comment') != undefined) {
                data = JSON.parse($.cookie('comment'));
                $methods.addComment(data.action, data.data, function (response) {
                    $list.prependComment(response);
                });
                $.removeCookie('comment');
            }

            // trigger initialize methods
            $methods.load();

            // register plugin events
            $(document).on('socket.ready', function (e, socket) {
                socket.on(commentNamespace + ':comment.created', function (data) {
                    if (currentEntityId != data.entity_id) {
                        return;
                    }

                    var tempId = '#' + data.hash;
                    $(tempId).remove();

                    if (data.parent_id) {
                        var $parent = $container.find('#comment__' + data.parent_id);
                        if ($parent.length) {
                            $parent.children('.comments-list').appendComment($methods.prepareComment(data));
                        }
                    } else {
                        $list.prependComment($methods.prepareComment(data));
                    }

                    commentCount = data.count;
                    commentRootCount = data.root_count;
                    $methods.onChangedCommentCount();
                });

                socket.on(commentNamespace + ':comment.updated', function (data) {
                    if (currentEntityId != data.entity_id) {
                        return;
                    }
                    var $comment = $container.find('#comment__' + data.id);

                    $methods.updateCommentHtml($comment.children('.comment-box').first(), data);
                });

                socket.on(commentNamespace + ':comment.deleted', function (data) {
                    if (currentEntityId != data.entity_id) {
                        return;
                    }

                    var $comment = $container.find('#comment__' + data.id);
                    if ($comment) {
                        $comment.remove();
                    }

                    commentCount = data.count;
                    commentRootCount = data.root_count;
                    $methods.onChangedCommentCount();
                });
            });

            $loadMoreButton.click(function (e) {
                e.preventDefault();

                var l = $loadMoreButton.ladda();
                l.ladda('start');
                $methods.load(function () {
                    l.ladda('stop');
                });
            });

            $commentForm.on('submit', function (e) {
                e.preventDefault();

                var comment = $('#comment').val();
                if (!isAdmin && $methods.containsUrl(comment)) {
                    return alert('Không thể sử dụng url khi comment');
                }
                if (checkUser()) {

                    var $button = $commentForm.find('[type="submit"]');
                    var l = $button.ladda();
                    l.ladda('start');

                    $methods.addComment(
                        $commentForm.attr('action') + '?hash=' + hash,
                        $commentForm.serialize(),
                        function (response) {
                            l.ladda('stop');
                            $list.prependComment(response);
                            $('#comment').val('');
                        },
                        function () {
                            l.ladda('stop');
                        }
                    );
                } else {
                    $.cookie('comment', JSON.stringify({
                        'action': $commentForm.attr('action') + '?hash=' + hash,
                        'data': $commentForm.serialize()
                    }));
                    login(window.location.pathname);
                }
            });

            $container.on('submit', '.reply-form', function (e) {
                e.preventDefault();
                var $self = $(this);
                var comment = $self.find('#replyComment').val();
                if (!isAdmin && $methods.containsUrl(comment)) {
                    return alert('Không thể sử dụng url khi comment');
                }

                var $button = $self.find('[type="submit"]');
                var l = $button.ladda();
                l.ladda('start');

                $methods.addReply(
                    $self.attr('action'),
                    {comment: comment},
                    function (response) {
                        l.ladda('stop');
                        $self.parents('.comment-wrapper').first().find('.child-reply').first().append(response);
                    },
                    function () {
                        l.ladda('stop');
                    }
                );
            });

            $container.on('click', '.comment-report-spam', function (e) {
                e.preventDefault();
                if ($(this).hasClass('reported')) {
                    return false;
                }

                var result = confirm("Do you want to report this comment?");
                if (!result) {
                    return false;
                }

                var $container = $(this).closest('.comment-box');

                $.ajax({
                    url: $(this).attr('href'),
                    type: 'POST',
                    success: function (response) {
                        $container.html(response);
                    }
                });
            });
        });
    };


    $(document).on('click', '.reply-comment', function () {
        $(this).siblings('.reply-form').toggle().find('[name="comment"]').focus();
    });

    $(document).on('click', '.upvote', function (e) {
        var $container = $(this).closest('.comment-box');
        e.preventDefault();
        $.ajax({
            url: $(this).attr('href'),
            type: 'POST'
        })
            .done(function (response) {
                // $container.html(response);
            });
    });
});

function checkUser() {
    if (user.id !== null) return true;
    else return false;
}
/**
 * Jason <pmhai90@gmail.com>
 * Validate register form
 */
function registerValidate() {
    var pass = $('#frm-registerForm-password').val();
    var repass = $('#frm-registerForm-cfpassword').val();
    if (pass === repass) {
        return true;
    } else {
        return false;
    }
}

function forgotPassword() {
    popup('forgot_password');
}

function reportSpam(comment_id, url) {
    if (comment_id && comment_id !== undefined) {
        var result = confirm("Do you want to report this comment?");
        if (result) {
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    'comment_id': comment_id
                }
            })
        }
    }
}
