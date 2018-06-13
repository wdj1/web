// 导航条
$(window).scroll(function () {
  //当屏幕滚动，使导航条距离浏览器顶部大于50px时，给其加上top-nav类（加上背景颜色，padding设为0）
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav");
  }else {
    //导航条回到最顶部，删除top-nav类
    $(".navbar-fixed-top").removeClass("top-nav");
  }
  //小屏幕下的导航条折叠
  if ($(window).width() < 768) {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-toggle").css({ "display": "inline" });
    }else {
      $(".navbar-toggle").css({ "display": "none" });
    }
    //点击链接之后，把导航选项折叠起来
    $("#navbar a").click(function () {
      $("#navbar").collapse('hide');
    });
    //滚动屏幕时，把导航选项折叠起来
    $(window).scroll(function () {
      $("#navbar").collapse('hide');
    });
    if ($(window).width() >= 768) {
      $(".navbar-toggle").css({"display": "none"});
    }
  }
});

//阻止Safari浏览器下的手动缩放
window.onload=function () {
  document.addEventListener('touchstart',function (event) {
    if(event.touches.length>1){
      event.preventDefault();
    }
  });
  var lastTouchEnd=0;
  document.addEventListener('touchend',function (event) {
    var now=(new Date()).getTime();
    if(now-lastTouchEnd<=300){
      event.preventDefault();
    }
    lastTouchEnd=now;
  },false);
  /*//小屏幕下去除视差滚动图
  if ($(window).width()<535) {
    $(".parallax-img").css({ "display": "none"});
    $(".mobile-img").css({ "display": "block"});
  }*/
};

//初始化wow插件
new WOW().init();

//表单验证（bootstrapValidator）
$(document).ready(function() {
  //生成一个简单的验证码
  function randomNumber(min,max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
  }
  $('#captchaOperation').html([randomNumber(1, 10), '+', randomNumber(10, 50), '='].join(' '));

  $('#signUpForm').bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: ' '
          },
          stringLength: {
            min: 6,
            max: 20,
            message: '账号至少由6位字符组成'
          },
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: ' '
          },
          stringLength: {
            min: 6,
            max: 30,
            message: '请设置6位字符以上的密码'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '只能由字母、数字、点和下划线组成'
          },
          different: {
            field: 'username',
            message: '密码不能与账号相同'
          }
        }
      },
      confirmPassword: {
        validators: {
          notEmpty: {
            message: ' '
          },
          different: {
            field: 'username',
            message: ' '
          },
          identical: {
            field: 'password',
            message: '请确认两次输入的密码一致'
          }
        }
      },
      captcha: {
        validators: {
          callback: {
            message: '请输入正确的计算结果',
            callback: function(value, validator, $field) {
              var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
              return value == sum;
            }
          }
        }
      },
      agree: {
        validators: {
          notEmpty: {
            message: ' '
          }
        }
      }
    }

  });
});
