//运动事件监听
window.onload = function() {
    var shake = true
    var music = true
    var input = document.querySelector('#name')
    var save = document.querySelector('#save')
    var again = document.querySelector('#again')
    var audio = document.querySelector('#audio')
    var bgMusic = document.querySelector('#bgMusic');
    var shakeEle = document.querySelector('#shake');
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }
    //获取加速度信息
    //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
    //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
    var SHAKE_THRESHOLD = 5000;
    var last_update = 0;
    var x, y, z, last_x = 0, last_y = 0, last_z = 0;
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 10) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                if(input.value && shake) {
                    loading()
                }               
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
    //随机数组
    var arr = [
        {
            img: '1',
            info: '你好我是你好我是你好我是你好我是你好我是你好我1',
            link: '#',
        },
        {
            img: '2',
            info: '你好我是你好我是你好我是你好我是你好我是你好我2',
            link: '#',
        },
        {
            img: '3',
            info: '你好我是你好我是你好我是你好我是你好我是你好我3',
            link: '#',
        },
        {
            img: '4',
            info: '你好我是你好我是你好我是你好我是你好我是你好我4',
            link: '#',
        },
        {
            img: '5',
            info: '你好我是你好我是你好我是你好我是你好我是你好我5',
            link: '#',
        }, {
            img: '6',
            info: '你好我是你好我是你好我是你好我是你好我是你好我6',
            link: '#',
        }
    ]
    function _renderRandomList(arr){
        _arr = arr.slice()
        var ran = Math.floor(Math.random() * _arr.length)
        //var newArr = []
        var list = document.getElementById('list');
        for (var i = _arr.length; i > 0; i--) {
            var r = Math.floor(Math.random() * i)
            var n = _arr.splice(r, 1)
            // newArr.push(n[0])
            var item = _renderItem(n[0].img, n[0].info, n[0].link);
            $(list).append(item)
        }
    }
    function _renderItem(img, info, link) {
        return '<div class="item">' + 
            '<div class="logo">' + img + '</div>' +
            '<div class="info">' + info + '</div>' +
            '<div class="link">' +
                '<a href="' + link + '">查看秘诀</a>' +
            '</div>' +
        '</div>'
    }
    
    // html2canvas
    function getScreenShoot(ele) {
        var canvas = document.createElement("canvas");
        canvas.width = ele.offsetWidth;
        canvas.height = ele.offsetHeight;
        html2canvas(ele, {
            canvas: canvas,
            onrendered: function (canvas) {
                var myImage = canvas.toDataURL("image/png");
                document.getElementById('print').setAttribute("src", myImage)
                document.getElementById('print').setAttribute("width", ele.offsetWidth)
                document.getElementById('print').setAttribute("height", ele.offsetHeight)
                preSave.style.display = 'none'; 
            }
        })
    }
    // new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");
    // 加载第二页
    function loading(){
        var loading = document.getElementById('loading');
        var rokid1 = document.getElementById('rokid1');
        var rokid2 = document.getElementById('rokid2');
        var list = document.getElementById('list');        
        loading.style.display = 'flex'
        $(shakeEle).removeClass('active');
        var timer = setTimeout(function() {
            loading.style.display = 'none'
            rokid1.style.display = 'none'
            rokid2.style.display = 'flex'
            $(list).empty();
            _renderRandomList(arr);
            shake=false
            clearTimeout(timer)
        }, 3000);
    }
    $(again).on('click', function(){
        var rokid1 = document.getElementById('rokid1');
        var rokid2 = document.getElementById('rokid2');
        var timer2 = setTimeout(function() {
            rokid2.style.display = 'none';
            rokid1.style.display = 'flex';
            shake = true;
            $(shakeEle).addClass('active');            
            clearTimeout(timer2)
        }, 400);
    })
    $(save).on('click', function() {
        var rokid2 = document.getElementById('rokid2');
        var preSave = document.getElementById('pre-save');
        rokid2.style.display = 'none';            
        preSave.style.display = 'block';
        audio.style.display = 'none';
        var qrcode = document.getElementById("qrcode")
        new QRCode('qrcode', {
            text: location.href,
            width: qrcode.clientWidth - 15,
            height: qrcode.clientHeight - 15,
        })
        getScreenShoot(document.getElementById('pre-save')) 
    })
    $(audio).on('click', function() {
        music = !music  
        music ? $(this).addClass('active') : $(this).removeClass('active')      
        music ? bgMusic.play() : bgMusic.pause()
    })
}