require.config({
    baseUrl: '/js/',
    paths: {
        'jquery': 'libs/jquery-3.1.1.min',
        'betterScroll': 'libs/better-scroll',
        'Zepto': 'libs/zepto'
    }
})

require(['jquery', 'betterScroll'], function($, BScroll) {
    var pagenum = 1;
    var num = 4;

    function getUserlist() {
        $.ajax({
            url: '/users',
            dataType: 'json',
            data: {
                pagenum: pagenum,
                num: num
            },
            success: function(data) {
                console.log(data.data);
                if (data.code == 1 && pagenum <= data.total) {
                    pagenum++;
                    render(data.data);
                }
            }
        })
    }
    getUserlist();


    function render(data) {
        var str = '';
        var baseUrl = 'http://localhost:3000/images/'
        data.forEach(function(file) {
            str += ` <dl>
                    <dt><img src="${baseUrl}${file.img}" alt=""></dt>
                    <dd>
                        <p>${file.description}</p>
                        <p>
                            <span>$${file.price}</span><span>39收藏</span>
                        </p>
                    </dd>
                </dl>`
        });
        con.innerHTML += str;
        var t = new BScroll('#content', {
            probeType: 2
        })

        t.on('scroll', function() {
            if (this.y < this.maxScrollY - 30) {
                getUserlist();
            }
        })

    }



})