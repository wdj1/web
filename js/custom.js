// 导航条
$(window).scroll(function () {  
            if ($(".navbar").offset().top > 50) {$(".navbar-fixed-top").addClass("top-nav");
            }else {$(".navbar-fixed-top").removeClass("top-nav");}
            if ($(window).width() < 768) {
            	if ($(".navbar").offset().top > 50) {$(".navbar-toggle").css({ "display": "inline" });	
            	}else {$(".navbar-toggle").css({ "display": "none" });}
            }
        })

//初始化wow插件
new WOW().init();


//表单验证（bootstrapValidator）
$(document).ready(function() {
	//生成一个简单的验证码
	function randomNumber(min,max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	$('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));
	
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
						min: 4,
						max: 12,
						message: 'The username must be more than 4 and less than 12 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The username can only consist of alphabetical, number, dot and underscore'
					}
				}
			},
//			email: {
//				validators: {
//					emailAddress: {
//						message: 'The input is not a valid email address'
//					}
//				}
//			},
			password: {
				validators: {
					notEmpty: {
              message: ' '
          },
					stringLength: {
						min: 6,
						max: 30,
						message: 'The username must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: 'The password can only consist of alphabetical, number, dot and underscore'
					},
					different: {
						field: 'username',
						message: 'The password cannot be the same as username'
					}
				}
			},
			confirmPassword: {
				validators: {
					notEmpty: {
              message: ' '
          },
					stringLength: {
						min: 6,
						max: 30,
						message: ' '
					},
					regexp: {
						regexp: /^[a-zA-Z0-9_\.]+$/,
						message: ' '
					},
					different: {
						field: 'username',
						message: ' '
					},
					identical: {
						field: 'password',
						message: 'Password and confirm password not consistent'
					}
				}
			},
			captcha: {
        validators: {
          callback: {
              message: 'Wrong answer',
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