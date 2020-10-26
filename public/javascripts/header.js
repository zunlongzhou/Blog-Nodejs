$(document).ready(function(){
    var k=!0;
    $(".loginmask").css("opacity",0.8);
    $(".thirdlogin ul li:odd").css({marginRight:0});
    $(".openlogin").click(function(){
        k&&"0px"!=$("#loginalert").css("top")&& ($("#loginalert").show(),$(".loginmask").fadeIn(500),$("#loginalert").animate({top:200},400,"easeOutQuart"))
    });
    $(".loginmask,.closealert").click(function(){
        k&&(k=!1,$("#loginalert").animate({top:-600},400,"easeOutQuart",function(){$("#loginalert").hide();k=!0}),$(".loginmask").fadeOut(500))
    });
    $("#sigup_now,.reg a").click(function(){
        $("#reg_setp,#setp_quicklogin").show();
        $("#reg_setp").animate({left:0,top:50},500,"easeOutQuart")
    });
    $(".back_setp").click(function(){
        "block"==$("#setp_quicklogin").css("display")&&$("#reg_setp").animate({left:"100%"},500,"easeOutQuart",function(){$("#reg_setp,#setp_quicklogin").hide()})
    });
});

$.get('/users/getinfo', function (res) {
    if(res!=""){
        $('.theone').text(res[0].username);
        $('#userlogo').attr('src','/images/user/'+res[0]._id+'.jpg')
        $('.openlogin').css("display","none");
        $('.reg').css("display","none");
        $('#showuser').css("display","block");
        $('#write').css("display","");
    }
})

var obj = {};
function login() {
    obj.username = $('.loginusername').val();
    obj.password = $('.loginuserpasswordt').val();
    console.log(obj)
    $.post('http://localhost:3000/login', obj, function (res) {
        if(res.length>0){
            location.href="/"
        }
        else{
            alert("登陆失败")
        }
    })
}

function register() {
    var username=$('#Rusername').val();
    var password=$('#Rpwd').val();
    var pwd=$('#Rpwd1').val();
    var mailbox=$('#Remail').val();
    if(pwd!=password) {
        alert('两次密码输入不一致');
        return;
    }
    var parames={};
    parames.username=username;
    parames.password=password;
    parames.mail=mailbox;
    console.log(parames);
    $.post('http://localhost:3000/register', parames, function(res) {
        if(res){
            alert("注册成功");
            location.href='/';
        }
    });
}

function logout() {
    console.log("logout")
    $.get('http://localhost:3000/logout', function (res) {
        if(res){
            location.reload();
        }
        else{
            alert("失败了....")
        }
    })
}